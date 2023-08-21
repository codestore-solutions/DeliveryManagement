import React from "react";
import { Typography, Row, Col, Card } from "antd";

const { Title } = Typography;
const { Meta } = Card;

interface Props {
  data: Array<any>;
}

const AgentDocument: React.FC<Props> = ({ data }) => {
  return (
    <>
      <Title level={4}>Agent Documents</Title>
      <div style={{ textAlign: "center" }}>
        <Row gutter={[16, 16]} justify="space-between">
          {data?.map((item) => (
            <Col span={8} key={item.key}>
              <Card
                style={{ width: 300 }}
                cover={<img alt="example" src={item?.image} />}
              >
                <Meta title={item.label} />
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </>
  );
};

export default AgentDocument;

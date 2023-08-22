import { message } from "antd";
import { CopyOutlined } from "@ant-design/icons";
import copy from "copy-to-clipboard";
import '../../App.scss';

const copyTextToClipboard = (text: string) => {
  copy(text);
  message.success("Text copied to clipboard");
};

const truncateText = (text:string) => {
    let Arr =  text.split(',');
    const words = Arr[0];
    return words + '...';
};

const CustomizeText = (data: any) => {
  let truncatedText =  data?.length > 15 ? truncateText(data) : data;
    return (
      <span className="tableId" title={data} style={{display:"flex", alignItems:"center"}}>
       <p className="tableTxt"> {truncatedText}</p>
        <span style={{paddingLeft: "10px"}} onClick={() =>copyTextToClipboard(data)}>
          <CopyOutlined color={"#9AE2C0"} />
        </span>
      </span>
    );
};

export default CustomizeText;

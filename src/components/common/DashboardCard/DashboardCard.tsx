import React from 'react';
import styles from './DashboardStyle';
import {Text, View} from 'react-native';
import {DeliveryTruckIcon, SimpleLineIcon} from '../../../assets';

interface CardProps {
  cardHeading: string;
  cardDesc: string;
  cardIconType: number;
  cardBackground: string;
  iconBackground: string;
}

const DashboardCard: React.FC<CardProps> = ({
  cardBackground,
  cardDesc,
  cardHeading,
  iconBackground,
  cardIconType,
}) => {
  return (
    <View style={[styles.dashboardCard, {backgroundColor: cardBackground}]}>
      <View style={[styles.cardIconBack]}>
        {cardIconType === 0 ? (
          <DeliveryTruckIcon height={150} width={150} />
        ) : (
          <SimpleLineIcon height={150} width={185} />
        )}
      </View>
      <View style={styles.cardContent}>
        <View style={[styles.cardIcon, {backgroundColor: iconBackground}]}>
          {cardIconType === 0 ? (
            <DeliveryTruckIcon height={30} width={30} />
          ) : (
            <SimpleLineIcon height={30} width={30} />
          )}
        </View>
        <Text style={styles.cardHeading}>{cardHeading} </Text>
        <Text style={styles.cardDesc}> {cardDesc} </Text>
      </View>
    </View>
  );
};

export default DashboardCard;

import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {ArrowIcon} from '../../../assets';
import globalStyle from '../../../global/globalStyle';

interface AccordionProps {
  title: string;
  content: string;
}

const Accordion: React.FC<AccordionProps> = ({title, content}) => {
  const [expanded, setExpanded] = useState<boolean>(false);

  const toggleAccordion = (): void => {
    setExpanded(!expanded);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Title for the Accordian</Text>
        <TouchableOpacity onPress={toggleAccordion}>
          <ArrowIcon width={25} height={25} />
        </TouchableOpacity>
      </View>

      {expanded && <Text style={styles.content}>{content}</Text>}
    </View>
  );
};

export default Accordion;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    backgroundColor: '#F9F9F9',
    borderRadius: 15,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    color: globalStyle.colors.labelColor,
    fontWeight: '500',
    fontSize: 20,
    letterSpacing: 0.02,
  },
  content: {
    color: '#7E8299',
    fontWeight: '400',
    fontSize: 14,
    letterSpacing: 0.01,
  },
});

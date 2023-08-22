export const getTimeLineData = (data: any,updateTimeLineData:any) => {
    let autoAssignPayload = Array<any>();
    data.forEach((item: any) => {
        let title = '', key=0;
        switch (item?.orderStatusId) {
          case 6:
            title = 'Way to Pickup the Parcel';
            key=0;
            break;
          case 8:
            title = 'Parcel Picked & On the way';
            key =1;
            break;
          case 9:
            title = 'Reached Destination';
            key=2;
            break;
          case 11:
            title = 'Delivered';
            key =3;
            break;
          default:
            title = 'Parcel Packed';
            key =4;
        }
    
        // Assuming item?.timestamp is in milliseconds (UNIX timestamp), convert it to a readable date and time
        const timestampDate = new Date(item?.timestamp);
        const description = timestampDate.toLocaleString(); // Adjust the format as needed
        let payload = {
          key,
          title,
          description,
        };
        updateTimeLineData(payload);
        autoAssignPayload.push(payload);
      });
      return autoAssignPayload;
  };

  export const getCurrIdx = (data:any) =>{
    let greatestIndex = 0;
    let greatestTimestamp = new Date(data[0].timestamp).getTime();
  
    for (let i = 1; i < data.length; i++) {
      const timestamp = new Date(data[i].timestamp).getTime();
      if (timestamp > greatestTimestamp) {
        greatestTimestamp = timestamp;
        greatestIndex = i;
      }
    }
  
    return greatestIndex;
  
}
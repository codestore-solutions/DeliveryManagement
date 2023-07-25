




export const getHoursList=() =>{
    const alldays = [];
    for (let hour = 0; hour < 24; hour++) {
      const formattedHour = hour.toString().padStart(2, '0');
      const time = `${formattedHour}:00`;
      alldays.push(time);
    }
    return alldays;

};
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { format, addDays, parseISO } from 'date-fns';
import axios from 'axios';
import { fr } from 'date-fns/locale';


const Calendar = () => {
  const [schedules, setSchedules] = useState({});
  const [startDate, setStartDate] = useState(new Date());
  const minimumDate = new Date();

  useEffect(() => {
    const requestBody = {
      start_date: format(startDate, 'yyyy-MM-dd'),
      end_date: format(addDays(startDate, 6), 'yyyy-MM-dd')
    };

    const headers = {
      'apikey': 'IK-HJQT0XWDYA2I2B000NVD', 
      'Content-Type': 'application/json'
    };

    // Fetch slots
    axios.post('https://ikalas.com/api/v1/ik-slots', requestBody, { headers })
      .then(response => {
        // Process the response data to group by date
        const groupedSchedules = response.data.result.reduce((acc, schedule) => {
          const startDate = format(parseISO(schedule.start), 'yyyy-MM-dd');
          const startTime = format(parseISO(schedule.start), 'HH:mm');
          const endTime = format(parseISO(schedule.end), 'HH:mm');

          if (!acc[startDate]) {
            acc[startDate] = [];
          }
          acc[startDate].push(`${startTime} - ${endTime}`);

          return acc;
        }, {});

        setSchedules(groupedSchedules);
      })
      .catch(error => {
        console.error('Error fetching slots:', error);
      });
  }, [startDate]);

  // Handle previous and next week navigation
  const handlePrevWeek = () => {
    if (startDate > minimumDate) {
      setStartDate((prevDate) => addDays(prevDate, -7));
    }
  };

  const handleNextWeek = () => {
    setStartDate((prevDate) => addDays(prevDate, 7));
  };

  // Get dates for the current week
  const getWeekDates = (start) => {
    const dates = [];
    for (let i = 0; i < 7; i++) {
      dates.push(addDays(start, i));
    }
    return dates;
  };

  const weekDates = getWeekDates(startDate);

  return (
    <View style={styles.container}>
      {/* Left Arrow */}
      <TouchableOpacity
        style={styles.leftArrow}
        onPress={handlePrevWeek}
        disabled={startDate <= minimumDate}
      >
        <Text style={[styles.arrowText, startDate <= minimumDate && styles.disabledArrow]}>
          &lt;
        </Text>
      </TouchableOpacity>

      {/* Right Arrow */}
      <TouchableOpacity style={styles.rightArrow} onPress={handleNextWeek}>
        <Text style={styles.arrowText}>&gt;</Text>
      </TouchableOpacity>

      {/* Calendar Display */}
      <ScrollView horizontal contentContainerStyle={styles.weekContainer}>
        {weekDates.map((date) => (
          <View key={date} style={styles.dayContainer}>
            <View style={styles.dayTextContainer}>
              <Text style={styles.dayNameText}>
                {format(date, 'eee', { locale: fr }).replace(/\.$/, '')}
              </Text>
              <Text style={styles.dayDateText}>
                {format(date, 'dd MMM', { locale: fr }).replace(/\.$/, '')}
              </Text>
            </View>
              {schedules[format(date, 'yyyy-MM-dd')] ? (
                schedules[format(date, 'yyyy-MM-dd')].map((time, index) => (
                  <TouchableOpacity 
                    key={index} 
                    style={styles.scheduleContainer}
                    activeOpacity={0.6}
                  >
                    <Text style={styles.scheduleText}>{time}</Text>
                  </TouchableOpacity>
                ))
                ) : (<Text></Text>)
              }
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    position: 'relative',
  },
  leftArrow: {
    position: 'absolute',
    left: 10,
    top: '50%',
    transform: [{ translateY: -12 }],
    zIndex: 1,
  },
  rightArrow: {
    position: 'absolute',
    right: 10,
    top: '50%',
    transform: [{ translateY: -12 }],
    zIndex: 1,
  },
  arrowText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  disabledArrow: {
    color: 'gray'
  },
  weekContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
  },
  dayContainer: {
    width: 80,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  dayTextContainer: {
    alignItems: 'center',
    marginBottom: 5,
  },
  dayNameText: {
    fontSize: 16,
    color: '#555',
  },
  dayDateText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  scheduleContainer: {
    marginVertical: 2,
    padding: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  scheduleText: {
    fontSize: 14,
  }
});

export default Calendar;

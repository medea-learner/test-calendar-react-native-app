import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { format, addDays } from 'date-fns';
import { fr } from 'date-fns/locale';


const Calendar = () => {
  const [startDate, setStartDate] = useState(new Date());
  const minimumDate = new Date();

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
  }
});

export default Calendar;

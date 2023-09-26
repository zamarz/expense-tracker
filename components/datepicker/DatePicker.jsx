import { useState } from 'react';
import { DatePickerModal } from 'react-native-paper-dates';
import { View } from 'react-native'

export default function DatePicker(handleChange) {
    const [date, setDate] = useState(undefined);
    const [open, setOpen] = useState(false);
    
    const onDismissSingle = () => {
        setOpen(false);
    }

    const onConfirmSingle = (params) => {
        setOpen(false);;
        setDate(params.date)
        handleChange(date);
    }

    return (
          <View style={{ justifyContent: 'center', flex: 1, alignItems: 'center' }}>
            <Button onPress={() => setOpen(true)} uppercase={false} mode="outlined">
              Pick single date
            </Button>
            <DatePickerModal
              locale="en"
              mode="single"
              visible={open}
              onDismiss={onDismissSingle}
              date={date}
              onConfirm={onConfirmSingle}
            />
          </View>
      )

}
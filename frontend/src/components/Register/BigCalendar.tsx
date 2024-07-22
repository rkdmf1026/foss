import dayjs from 'dayjs';
import { useCallback, useEffect, useState } from 'react';
import { Calendar, dayjsLocalizer, View, SlotInfo } from 'react-big-calendar';
import '../../styles/BigCalendarStyle.css';
import { CalendarEvent } from 'types/calendar';
import events from 'types/events';
import 'dayjs/locale/ko';
import { maxDate, minDate } from '@constants/todayRange';
import BigCalendarToolbar from './BigCalendarToolbar';
import { EventList } from './Eventlist';
import Intro from '@components/common/Intro';

dayjs.locale('ko');

const localizer = dayjsLocalizer(dayjs);

const BigCalendar = () => {
  const min = minDate;
  const max = maxDate;
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState(dayjs().toDate());
  // 테스트 용, 이것도 옮겨야됨
  const [testevents, setEvents] = useState([
    {
      id: '',
      start: '',
      end: '',
      title: '',
      calenderType: 0,
    },
  ] as unknown as CalendarEvent[]);
  // zustand로 옮겨야 하는 것
  const [selectedEvents, setSelectedEvents] = useState<CalendarEvent[]>([]);
  // 이건 옮길 필요 없을 듯
  const [value, setValue] = useState(-1);
  // 달력 이동 제한
  const onNavigate = useCallback(
    (newDate: Date) => {
      const dayjsDate = dayjs(newDate);
      if (
        (dayjsDate.isAfter(min) || dayjsDate.isSame(min)) &&
        (dayjsDate.isBefore(max) || dayjsDate.isSame(max))
      ) {
        setDate(newDate);
      }
    },
    [min, max]
  );
  useEffect(() => {
    setEvents(events);
    setTimeout(() => {
      setLoading(true);
    }, 1000);
  }, []);

  const dayPropGetter = useCallback((date: Date) => {
    const isPastDate = dayjs(date).isBefore(dayjs(), 'day');
    if (isPastDate) {
      return {
        style: {
          backgroundColor: '#f0f0f0',
          color: '#aaa',
          cursor: 'not-allowed',
        },
      };
    }
    return {};
  }, []);
  // 처리하는 로직
  const handleSelectDate = useCallback(
    (selectedDate: Date) => {
      if (
        dayjs(selectedDate).isSame(dayjs(), 'day') ||
        dayjs(selectedDate).isAfter(dayjs(), 'day')
      ) {
        const eventsOnSelectedDate = testevents.filter((event) =>
          dayjs(event.start).isSame(selectedDate, 'day')
        );
        setSelectedEvents(eventsOnSelectedDate);
      } else {
        setSelectedEvents([]);
      }
    },
    [testevents]
  );

  const onSelectSlot = useCallback(
    (slotInfo: SlotInfo) => {
      handleSelectDate(slotInfo.start);
      setValue(-1);
    },
    [handleSelectDate]
  );
  const onSelectEvent = useCallback(
    (event: CalendarEvent) => {
      handleSelectDate(event.start);
      setValue(-1);
    },
    [handleSelectDate]
  );

  return (
    <>
      <Intro title="면접 신청하기" sub="나에게 필요한 멘토를 찾아 미팅을 신청해보세요." />
      <div className="flex gap-10">
        <>
          {loading ? (
            <>
              <>
                <Calendar
                  localizer={localizer}
                  date={date}
                  onNavigate={onNavigate}
                  views={['month'] as View[]}
                  min={min}
                  max={max}
                  events={testevents}
                  dayPropGetter={dayPropGetter}
                  onSelectEvent={onSelectEvent}
                  onSelectSlot={onSelectSlot}
                  selectable={true}
                  startAccessor="start"
                  endAccessor="end"
                  style={{ height: 680, width: 800 }}
                  components={{
                    toolbar: BigCalendarToolbar,
                  }}
                />
              </>
            </>
          ) : (
            <div>loading중</div>
          )}
        </>
        <div className="w-[400px] min-w-[200px]">
          <EventList events={selectedEvents} value={value} setValue={setValue} />
        </div>
      </div>
    </>
  );
};

export default BigCalendar;
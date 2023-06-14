import { DateTime } from 'luxon';

export default function makeSection(chatList) {
  const sections = {};

  chatList.forEach((chat) => {
    const monthDate = DateTime.fromFormat(
      chat.created_at,
      'yyyy-MM-dd HH:mm:ss'
    ).toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY);

    // console.log(chat);
    if (Array.isArray(sections[monthDate])) {
      sections[monthDate].push(chat);
    } else {
      sections[monthDate] = [chat];
    }
  });

  return sections;
}

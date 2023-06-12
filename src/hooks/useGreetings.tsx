export default function useGreetings() {
  let now = new Date();

  let isMorning = now.getHours() > 5 && now.getHours() <= 12;
  let isAfternoon = now.getHours() > 12 && now.getHours() <= 18;
  let isEvening = now.getHours() > 18 && now.getHours() <= 22;
  let isNight = now.getHours() > 22 || now.getHours() <= 5;

  let greetings;
  if (isMorning) {
    greetings = "Good Morning";
  }
  if (isAfternoon) {
    greetings = "Good Afternoon";
  }

  if (isEvening || isNight) {
    greetings = "Good Evening";
  }
  return greetings;
}

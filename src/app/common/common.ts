export function getStatus(elem) {
  if (!elem) {
    return 'Unknown';
  } else {
    if (elem >= -200 && elem <= 200) {
      return 'On Time';
    } else if (elem < -200) {
      return 'Early';
    } else if (elem > 200) {
      return 'Late';
    }
  }
}

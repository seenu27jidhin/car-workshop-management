let counter = 0; // In production, use DB to persist and increment

const generateRegistrationNumber = () => {
  const year = new Date().getFullYear();
  counter += 1;
  return `EMP-${year}-${String(counter).padStart(4, '0')}`;
};
export default generateRegistrationNumber;

// A mock function to mimic making an async request for data
const fetchCount = (amount = 1): Promise<{ data: number }> => {
  return new Promise<{ data: number }>((resolve) =>
    setTimeout(() => resolve({ data: amount }), 500)
  );
};

export default fetchCount;

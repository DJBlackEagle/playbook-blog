interface Date {
  addHours(hours: number): Date;
}

Date.prototype.addHours = function (this: Date, hours: number): Date {
  const result = new Date(this);
  result.setHours(result.getHours() + hours);
  return result;
};

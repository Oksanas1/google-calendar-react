import { createEventInDB, updateEventInDB } from "../../../gateway/index";

export const createnewObj = ({
  id,
  title,
  description,
  color,
  date,
  startTime,
  endTime,
}) => ({
  id: id || "",
  title,
  description,
  color,
  dateFrom: new Date(`${date} ${startTime}`).getTime(),
  dateTo: new Date(`${date} ${endTime}`).getTime(),
});

export const updateListInDB = (dataForm) => {
  const newObj = createnewObj(dataForm);

  return dataForm.id
    ? updateEventInDB(dataForm.id, newObj)
    : createEventInDB(newObj);
};

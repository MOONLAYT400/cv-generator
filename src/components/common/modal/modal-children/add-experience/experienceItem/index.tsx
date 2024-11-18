import { FC } from "react";
import { IExperienceItem } from "@/types/cv-data"

import { Button, ButtonsGroup, ItemDescription, Wrapper } from "./index.styled";


interface IExperienceDutyItem {
  item: { id: number, text: string | number }, // интерфейс есть
  idx: number,
  setList: (value: any) => void,
  updatedItem: number | null,
  setUpdatedItem: (value: number | null) => void,
}

export const ListItem: FC<IExperienceDutyItem> = ({
  item: { id, text },
  idx,
  setList,
  updatedItem,
  setUpdatedItem,
}) => {
  const isCurrentBeingUpdated = updatedItem === id;

  const handleInputChange = ({ target: { value } }: { target: { value: string } }) => { // нельзя сделать отмену, изменения сразу сохраняются 
    setList(
      (prevList: IExperienceItem) => {
        const newDuties = prevList.duties.map((item) =>
          item.id === id ? { ...item, text: value } : item
        );
        return { ...prevList, duties: newDuties }
      }

    );
  };

  const handleDelete = () => {
    setList(
      (prevList: IExperienceItem) => {
        const newDuties = prevList.duties.filter((item) => item.id !== id);
        return { ...prevList, duties: newDuties }
      }

    );
  };

  const renderTextOrInput = () => {
    return isCurrentBeingUpdated ? (
      <input value={text} onChange={handleInputChange} />
    ) : (
      text
    );
  };

  return (
    <Wrapper>
      <ItemDescription>
        {idx + 1}. {renderTextOrInput()}
      </ItemDescription>
      <ButtonsGroup>
        
          <Button onClick={() => {
            console.log('id ', id)
            setUpdatedItem(isCurrentBeingUpdated ? null : id)
          }
          }>
            {isCurrentBeingUpdated ? "Сохранить" : <>&#9999;</>}
          </Button>
          {!isCurrentBeingUpdated
            && <Button
              onClick={handleDelete}>
              &#128465;
            </Button>}
        
      </ButtonsGroup>


    </Wrapper>
  );
};

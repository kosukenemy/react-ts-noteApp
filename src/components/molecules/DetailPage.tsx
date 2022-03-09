import React, { useState, useEffect, useRef } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { ItemType, LocationType } from '../../types';
import { putItem, deleteItem } from '../../api';
import Button from '../atoms/Button';
import TextField from '../atoms/TextField';


const DetailPage = () => {
  let { id } = useParams();
  const navigate = useNavigate();
  const location: LocationType = useLocation();
  const { items } = location.state;
  const [item, setItem] = useState<ItemType>();
  const [isEdit, setIsEdit] = useState(false);

  const editTitle = useRef<HTMLInputElement>(null);
  const editContent = useRef<HTMLInputElement>(null);

  const handleEdit = () => setIsEdit(!isEdit);
  console.log(item?.id)

  const handleSubmit = async(event: React.FormEvent<HTMLFormElement>) => {
     event.preventDefault();

    const editItem:ItemType = {
      id: item?.id,
      title: editTitle?.current?.value,
      content: editContent?.current?.value,
    };
    await putItem(editItem);
    navigate("/", { replace: true });
  }

  const handleDelete = async (id: any) => {
    await deleteItem(id);
    navigate("/", { replace: true });
    alert('削除しました');
  } 

  useEffect(() => {
    (async() => {
      setItem(
        items.find((data:ItemType) => data.id === id )
      );
    })();
  },[]);

  return (
    <div>
      { isEdit ?
        <form onSubmit={(event) => handleSubmit(event)}>
          <TextField 
            type={"text"} 
            name={"title"} 
            title={editTitle} 
            value={item?.title}
            displayName={"タイトル"}
          />
          <TextField 
            type={"textarea"} 
            name={"title"} 
            title={editContent} 
            value={item?.content}
            displayName={"本文"}
          />
          <Button 
            text={"更新"}
            background={"#5c9ca5"}
            color={"#fff"}
            /
          >
          <Button 
            text={"戻る"}
            background={"#E2E2E2"}
            color={"#C96A8B"}
            /
          >
        </form>
        :
        <div>
          <StyledContainer>
            <StyledHead>タイトル</StyledHead>
            <StyledTitle>{item?.title}</StyledTitle>
            <StyledHead>本文</StyledHead>
            <StyleContent>{item?.content}</StyleContent>
          </StyledContainer>
          <Button 
            text={"編集"}
            background={"#5c9ca5"}
            color={"#fff"}
            onClick={handleEdit}
            /
          >
          <Button 
            text={"削除"}
            background={"#C96A8B"}
            color={"#E2E2E2"}
            onClick={() => handleDelete(item?.id)}
            /
          >
        </div>
      }

    </div>
    
  )
}

export default DetailPage

const StyledContainer = styled.ul`
  margin: 0 auto 10px;
  padding: 0;
`;

const StyledHead = styled.p`
  font-size: 16px;
  font-weight: bold;
  color: #707070;
  display: block;
  margin: 10px auto 5px;
`;

const StyledTitle = styled.li`
  list-style: none;
  font-size: 18px;
`;

const StyleContent = styled.li`
  list-style: none;
  white-space: pre;
  font-size: 18px;
`;
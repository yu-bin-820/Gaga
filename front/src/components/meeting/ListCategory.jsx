import { Button } from '@mui/material';
import { Box } from '@mui/system';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const ListCategory = () => {
    const [mainCategoryList, setMainCategoryList] = useState();
    const [subCategoryList, setSubCategoryList] = useState();
    const [open, setOpen] = useState(true);

    useEffect(()=>{
        axios
            .get(`http://${import.meta.env.VITE_SPRING_HOST}/rest/meeting/maincategory`)
            .then((response)=>{
                console.log(response.data);
                setMainCategoryList(response.data);
            })
            .catch((error)=>{
                console.log(error);
            });
    },[]);

    useEffect(()=>{
        axios
            .get(`http://${import.meta.env.VITE_SPRING_HOST}/rest/meeting/subcategory`)
            .then((response)=>{
                console.log(response.data);
                setSubCategoryList(response.data);
            })
            .catch((error)=>{
                console.log(error);
            });
    },[]);

    const handleClick = () => {
        setOpen(!open);
    };

    return (
        <Box>
            <Box>
                {mainCategoryList?.map((mainCategory,i)=>(
                    <Box key={i}>
                    <Button
                    id={mainCategory.mainCategoryNo}
                    onClick={handleClick}>{mainCategory.mainCategoryName}</Button>
                    <Box>
                    {subCategoryList?.map((subCategory, k) => {
            if (subCategory.mainCategoryNo === mainCategory.mainCategoryNo) {
              return (
                <Box key={k}>
                  <Button
                    id={subCategory.tag}
                    onClick={handleClick}
                  >
                    {subCategory.tag}
                  </Button>
                </Box>
              );
            }
            return null;
          })}
                    </Box>
                </Box>
                    
                ))}
            </Box>
        </Box>
    );
};

export default ListCategory;
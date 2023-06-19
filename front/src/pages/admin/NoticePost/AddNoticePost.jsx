import { PhotoCamera } from "@mui/icons-material";
import {
    Alert,
    Button,
    ImageList,
    ImageListItem,
    TextField,
    Typography,
} from "@mui/material";
import { Box, Stack } from "@mui/system";
import { MenuItem } from "@mui/material";

import axios from "axios";
import React, { useCallback, useState, useEffect } from "react";
import { useNavigate } from "react-router";
import useSWR from "swr";
import fetcher from "@utils/fetcher";
import CommonTop from "@layouts/common/CommonTop";
import CreateIcon from "@mui/icons-material/Create";


const useInput = (initialValue) => {
    const [value, setValue] = useState(initialValue);

    const onChange = (e) => {
        setValue(e.target.value);
    };

    const clear = () => {
        setValue("");
    };

    return [value, onChange, clear];
};

const AddNoticePost = () => {
    const navigate = useNavigate();
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedThumbNailImage, setSelectedThumbNailImage] = useState(null);
    const [selectedThumbNailFile, setSelectedThumbNailFile] = useState(null);
    const [noticePostTitle, onChangeNoticePostTitle, clearNoticePostTitle] =
        useInput("");
    const [noticePostText, onChangeNoticePostText, clearNoticePostText] =
        useInput("");
    const [noticePostCategory, setNoticePostCategoryNo] = useState(0); // 카테고리 선택 상태값
    const [qnaCategory, setQnaCategory] = useState(0);
    const [noticePost, setNoticePost] = useState({});
    
    const { data: myData, mutate: mutateMe } = useSWR(
        `${import.meta.env.VITE_SPRING_HOST}/rest/user/login`,
        fetcher
    );

    useEffect(() => {
        if (myData) {
            const { userNo, role } = myData;
            console.log(userNo, role, "유저넘버랑 권한");

            if (role !== 1) {
                alert("권한이 없습니다.");
                window.history.back();
            }
        }
    }, [myData]);

    const submitNoticePost = useCallback(() => {
        if (!noticePostTitle) {
            alert("제목은 반드시 작성해주셔야 합니다.");
            return;
        }

        if (!noticePostText) {
            alert("내용은 반드시 작성해주셔야 합니다.");
            return;
        }
        const formData = new FormData();
        console.log(myData?.userNo, "유저넘인 섭밋");
        formData.append("file", selectedFile);
        if (noticePostCategory === 1) {
            formData.append("thumbNailFile", selectedThumbNailFile);
        }
        
        formData.append("noticePostCategory", noticePostCategory);
        formData.append("noticePostTitle", noticePostTitle);
        formData.append("noticePostText", noticePostText);
        formData.append("userNo", myData?.userNo)
        if (noticePostCategory === 2) {
            formData.append("qnaCategory", qnaCategory);
        }
        axios
            .post(
                `${import.meta.env.VITE_SPRING_HOST}/rest/admin/addNoticePost`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            )
            .then((response) => {
                console.log(response.data, "캐리");
                const noticePostNo = response.data;
                //navigate(`/notice/getNoticePost/noticePostNo/${noticePostNo}`);
                navigate(`/notice/list${getCategoryBack(noticePostCategoryNo)}Post`);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [
        selectedFile,
        selectedThumbNailFile,
        noticePostCategory,
        noticePostTitle,
        noticePostText,
        navigate,
    ]);

    useEffect(() => {
        setNoticePost({
          noticePostCategoryNo: noticePostCategory,
        });
      }, [noticePostCategory]);

    function getCategoryBack(noticePostCategoryNo) {

        switch (noticePostCategoryNo) {
          case 0:
            return "Notice";
          case 1:
            return "Event";
          case 2:
            return "Qna";
          default:
            return "Notice";
        }
    }
    const noticePostCategoryNo = noticePost.noticePostCategoryNo;
    const prevPath = `/notice/list${getCategoryBack(noticePostCategoryNo)}Post`;
    
    return (
        <Box
            sx={{ marginTop: "64px", marginLeft: "10px", marginRight: "10px" }}
        >
            <CommonTop
                pageName="게시글 작성"
                prevPath={prevPath}
            />
            <Stack spacing={2.5}>
                <TextField
                    label="제목"
                    value={noticePostTitle}
                    onChange={onChangeNoticePostTitle}
                />
                <TextField
                    label="내용"
                    multiline
                    rows={4}
                    value={noticePostText}
                    onChange={onChangeNoticePostText}
                />
                <TextField
                    select
                    label="카테고리"
                    value={noticePostCategory}
                    onChange={(e) =>
                        setNoticePostCategoryNo(Number(e.target.value))
                    }
                >
                    <MenuItem value={0}>공지사항</MenuItem>
                    <MenuItem value={1}>이벤트</MenuItem>
                    <MenuItem value={2}>FAQ</MenuItem>
                </TextField>
                {noticePostCategory === 2 && (
                    <TextField
                        select
                        label="FAQ카테고리"
                        value={qnaCategory}
                        onChange={(e) => setQnaCategory(Number(e.target.value))}
                    >
                        <MenuItem value={1}>회원</MenuItem>
                        <MenuItem value={2}>모임</MenuItem>
                        <MenuItem value={3}>클럽</MenuItem>
                        <MenuItem value={4}>채팅</MenuItem>
                        <MenuItem value={5}>서비스</MenuItem>
                        <MenuItem value={6}>기타</MenuItem>
                    </TextField>
                )}
                <Box
                    sx={{ display: "flex", flexDirection: "row", gap: "16px" }}
                >
                    <Box>
                        {selectedImage ? (
                            <img
                                style={{
                                    minWidth: "150px",
                                    minHeight: "150px",
                                    maxWidth: "150px",
                                    maxHeight: "150px",
                                }}
                                src={selectedImage}
                            />
                        ) : (
                            <Box
                                sx={{
                                    width: "100%",
                                    height: "100%",
                                    backgroundColor: "grey",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    minWidth: "100px",
                                    minHeight: "100px",
                                    maxWidth: "100px",
                                    maxHeight: "100px",
                                }}
                            >
                                <Typography
                                    sx={{
                                        fontSize: "1.2rem",
                                        color: "white",
                                        fontWeight: "bold",
                                    }}
                                >
                                    No Img
                                </Typography>
                            </Box>
                        )}
                    </Box>
                    <Stack spacing={1}>
                        <Button
                            variant="outlined"
                            startIcon={<PhotoCamera />}
                            color="primary"
                            aria-label="upload picture"
                            component="label"
                        >
                            이미지 업로드
                            <input
                                hidden
                                accept="image/*"
                                type="file"
                                onChange={(event) => {
                                    const file = event.target.files[0];
                                    setSelectedFile(file);
                                    setSelectedImage(URL.createObjectURL(file));
                                }}
                            />
                        </Button>
                        {noticePostCategory === 1 && (
                            <Button
                                variant="outlined"
                                startIcon={<PhotoCamera />}
                                color="primary"
                                aria-label="upload picture"
                                component="label"
                            >
                                썸네일 업로드
                                <input
                                    hidden
                                    accept="image/*"
                                    type="file"
                                    onChange={(event) => {
                                        console.log(event.target.files);
                                        const thumbNailFile = event.target.files[0];
                                        setSelectedThumbNailFile(thumbNailFile);
                                        setSelectedThumbNailImage(
                                            URL.createObjectURL(thumbNailFile)
                                        );
                                    }}
                                />
                            </Button>
                            
                        )}
                    </Stack>
                    </Box>
                    {noticePostCategory === 1 && (
                    <Box>
                        {selectedThumbNailImage ? (
                            <img
                                style={{
                                    minWidth: "370px",
                                    minHeight: "100px",
                                    maxWidth: "370px",
                                    maxHeight: "150px",
                                }}
                                src={selectedThumbNailImage}
                            />
                        ) : (
                            <Box
                                sx={{
                                    width: "100%",
                                    height: "100%",
                                    backgroundColor: "grey",
                                    display: "flex", flexDirection: "column", gap: "16px" ,
                                    alignItems: "center",
                                    justifyContent: "center",
                                    minWidth: "300px",
                                    minHeight: "100px",
                                    maxWidth: "300px",
                                    maxHeight: "100px",
                                }}
                            >
                                <Typography
                                    sx={{
                                        fontSize: "1.2rem",
                                        color: "white",
                                        fontWeight: "bold",
                                    }}
                                >
                                    No Img
                                </Typography>
                            </Box>
                            
                        )}
                    </Box>
                       )}
                
                <Button variant="contained" onClick={submitNoticePost}>
                    게시글 작성
                </Button>
            </Stack>
        </Box>
    );
};

export default AddNoticePost;

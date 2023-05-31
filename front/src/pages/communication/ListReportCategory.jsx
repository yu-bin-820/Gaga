import { Divider, List, ListItem, Typography } from '@mui/material';
import { Box, Stack } from '@mui/system';
import React, { useCallback, useState } from 'react';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { useNavigate, useParams } from 'react-router';
const ListReportCategory = () => {
  const navigate = useNavigate();
  const { reportedNo } = useParams();
  const [reportCategry, setReportCategory] = useState([
    '개인 연락처 또는 1:1 만남요구',
    'GAGA 취지에 반하는 모임 운영',
    'GAGA채팅이 아닌 외부 채팅방으로 유도',
    '비매너, 비협조적인 태도 등으로 모임 진행 방해',
    '비방, 폭언, 협박, 위협 등으로 불안감 조성',
    '성적 수치심, 불쾌감을 유발하는 발언',
    '특정 종교의 권유, 포교, 전도 목적 의심',
    '기타',
  ]);

  const onClickCategory = useCallback(
    (e) => {
      navigate(
        `/community/report/add/categoryno/${e.currentTarget.dataset.value}/reportedno/${reportedNo}`
      );
    },
    [navigate, reportedNo]
  );
  return (
    <Box sx={{ marginTop: '55px' }}>
      <Divider />
      <List>
        <ListItem>
          <Stack>
            <Typography sx={{ fontSize: 15, fontWeight: 700 }}>
              신고 사유를 선택해 주세요.
            </Typography>
            <Typography sx={{ fontSize: 11 }}>
              회원님의 소중한 의견은 GAGA를 더욱 안전하고
            </Typography>
            <Typography sx={{ fontSize: 11 }}>
              신뢰할 수 있도록 만드는데 큰 도움이 돼요.
            </Typography>
          </Stack>
        </ListItem>
        <Divider />
        {reportCategry.map((category, i) => (
          <div key={i}>
            <ListItem key={i} onClick={onClickCategory} data-value={i + 1}>
              <Stack
                direction={'row'}
                alignItems={'center'}
                sx={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <Typography
                  sx={{
                    fontSize: 14,
                    minHeight: '40px',
                    display: 'flex',
                    alignItems: 'center',
                    flexGrow: 1,
                  }}
                >
                  {category}
                </Typography>
                <NavigateNextIcon sx={{ marginRight: '-10px' }} />
              </Stack>
            </ListItem>
            <Divider />
          </div>
        ))}
      </List>
    </Box>
  );
};

export default ListReportCategory;

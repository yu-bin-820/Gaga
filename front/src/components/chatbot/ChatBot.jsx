import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './ChatBot.css';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import SmartToyRoundedIcon from '@mui/icons-material/SmartToyRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import PsychologyRoundedIcon from '@mui/icons-material/PsychologyRounded';
import { Backdrop, Fade, Modal } from '@mui/material';

//import { fetchGptResponse } from './gptapi';

function Chatbot() {
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [isGptMode, setIsGptMode] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const chatMessagesRef = useRef(null);
  const messageEndRef = useRef(null);

  function toggleChatBot() {
    if (isVisible) {
      setIsVisible(false);

    } else {
      setIsVisible(true);
      if (messages.length === 0) {
        handleOpenEvent().catch((error) => {
          console.error('handleOpenEvent 오류:', error);

        });
      }
    }
  }

  const handleOpenEvent = async () => {
    console.log("메시지 출발합니다");
	const apiUrl = `${import.meta.env.VITE_SPRING_HOST}/rest/chatbot`;
	const requestBodyWelcome = {
        version: "v2",
        userId: "nuWelcomeUserUserSuperUser",
        timestamp: new Date().getTime(),
        bubbles: [],
        event: "open",
    };
    
    const requestBodyStringWelcome = JSON.stringify(requestBodyWelcome);
    
    try {        
        const response = await axios.post(apiUrl, requestBodyWelcome, {
            headers: {
              'Content-Type': 'application/json;UTF-8',
            },
          });
       
          const jsonData = JSON.stringify(response);
      
          const jsonObject = JSON.parse(jsonData);

          if (jsonData.error) {
            console.error('네이버 챗봇 서버 에러:', jsonData.error);
            throw new Error(jsonData.error);
          }
      
          let botMessage = jsonObject.data.bubbles[0].data.description;
          let botMessage2 = jsonObject.data.bubbles[1].data.contentTable;
          let botMessage3 = jsonObject.data.bubbles[1].data;
          let contentTable = jsonObject.data.bubbles[1].data.contentTable;

          contentTable.forEach((row, rowIndex) => {
            row.forEach((item, itemIndex) => {
            // 이제 각 아이템에 대한 데이터를 다룰 수 있습니다.
            console.log(item.data.title); // 아이템 제목 출력
            console.log(item.data.data.action.data.url); // 아이템 URL 출력
        });
    });
         
          if (jsonObject.data.bubbles.length > 1) {
            if (jsonObject.data.bubbles[1].type === 'MULTILINKS') {
              let links = jsonObject.data.bubbles[1].data.component.list;
              botMessage += '\n다음 옵션 중 하나를 선택해주세요:\n';
              links.forEach((link, index) => {
                botMessage += `${index + 1}. ${link.title}\n`;
              });
            }
          }
   
          console.log(botMessage, '@@@jsonObject.data.bubbles[0].data.description@@@');
      

          const botMessageObject = { type: 'bot', text: botMessage };
          setMessages([...messages, botMessageObject]);

          return null;

          
        } catch (error) {
          console.error('handleOpenEvent 오류:', error);
          throw error;
        }
      };

  const handleOutsideClick = (event) => {
    if (!event.target.closest('.chat-container') && isVisible) {
      toggleChatBot();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isVisible]);
  
//HELP버튼 >> 추후 모달창으로 수정? 
  const handleHelpClick = () => {
    console.log("메시지 출발합니다"); 
    setIsModalOpen(true); // 모달 창 열기
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
	messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  //입력용
  const handleInput = (event) => {
    setInputText(event.target.value);
    if (event.key === 'Enter') {
      setInputText('');
    }
  };

  function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  
//메시지전송
  const sendMessage = async (event) => {
	event.preventDefault();
	const userMessage = { type: 'user', text: inputText };
	setMessages([...messages, userMessage]);

    if (isGptMode) {
        setIsTyping(true); // GPT 응답을 표시하는 동안 "입력 중" 상태로 설정
  
        const botMessage = await handleSendMessage(inputText);
        const botMessageArray = botMessage.split(''); // 응답 메시지를 한 글자씩 배열로 분리
  
        // 한 글자씩 지연시간을 두면서 메시지 추가
        for (let i = 0; i < botMessageArray.length; i++) {
          await delay(35); // 0.1초 대기 (원하는 지연시간 설정)
          const currentBotMessage = botMessageArray.slice(0, i + 1).join('');
          const currentBotMessageObject = { type: 'bot', text: currentBotMessage };
          setMessages([...messages, userMessage, currentBotMessageObject]);
        }        
        setIsTyping(false); // GPT 응답 표시 종료 후 "입력 중" 상태 해제
      } else {
	const response = await handleSendMessage(inputText);
	const botMessage = { type: 'bot', text: response };
	setMessages([...messages, userMessage, botMessage]);
      }
	setInputText('');
  };
  const chatContainerRef = useRef(null);
//gpt토글버튼
const handleToggleGpt = () => {
    const chatContainer = document.querySelector('.chat-container');
    const toggleChatBotBtn = document.querySelector('.toggleChatBot');

    if (chatContainer && toggleChatBotBtn ) {
      if (chatContainer.classList.contains('gpt-theme')) {
        setIsGptMode(false);        
        chatContainer.classList.remove('gpt-theme');
        toggleChatBotBtn.style.backgroundColor = '#036635';
  
        const gptStatusMessage = {
          type: 'bot',
          text: 'GPT 모드가 비활성화되었습니다.',
        };
        setMessages([...messages, gptStatusMessage]);
      } else {
        setIsGptMode(true);
        console.log("gpt모드입니다 과금주의");
        chatContainer.classList.add('gpt-theme');

        toggleChatBotBtn.style.backgroundColor = '#000005';
  
        const gptStatusMessage = {
          type: 'bot',
          text: 'GPT 모드가 활성화되었습니다.',
        };
        setMessages([...messages, gptStatusMessage]);
  
        // GPT 모드가 활성화된 경우에만 handleSendMessage 호출
        if (isGptMode) {
            console.log("gpt모드데스");
          handleSendMessage(inputText);
        }
      }
    }
  };
  const modalStyle = {
   /*  width: '50%',
    height: '50%',
    기타 원하는 스타일 속성들 */
  };

const handleSendMessage = async (text) => {
  document.querySelector('.toggleChatBot').addEventListener('click', async function () {
    this.classList.toggle('active');    
  });
  
  if (isGptMode) {
    const apiUrl =`${import.meta.env.VITE_SPRING_HOST}/rest/gpt`;
    const response = await axios.post(apiUrl, {
        prompt: inputText
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      // 서버로부터의 응답을 받아 JSON으로 변환

      // 변환된 JSON의 'text' 필드가 응답 메시지가 될 것이다.
      const botMessage = response.data;
      console.log("유원? u Do", botMessage)
      
      return botMessage;
    } else {
    //const apiUrl = 'http://192.168.0.37:8080/rest/chatbot';
    const apiUrl = `${import.meta.env.VITE_SPRING_HOST}/rest/chatbot`;
    const requestBody = {
        version: 'v2',
        userId: 'UserUserSuperUser',
        timestamp: new Date().getTime(),
        inputText: text,
        bubbles: [
          {
            type: 'text',
            data: {
              description: text,
            },
          },
        ],
        event: 'send',
        isGptMode: isGptMode,
      };    

    const requestBodyString = JSON.stringify(requestBody);

    return axios
      .post(apiUrl, requestBodyString, {
        headers: {
          'Content-Type': 'application/json;UTF-8',
        },
      })
      .then((response) => {
        let jsonData = response.data;
        let bubbleArray = jsonData.bubbles;
        let botMessage = bubbleArray[0].data.description;
        if (bubbleArray[0].data.url && bubbleArray[0].data.urlAlias) {
          botMessage = `${botMessage}\n\n[URL](${bubbleArray[0].data.urlAlias})`;
        }
        return botMessage;
      })
      .catch((error) => {
        console.error(error);
      });
  }
};

  return (
      <div>
          <button
              className="toggleChatBot"
              onClick={toggleChatBot}
              style={{ backgroundColor: '#036635' }}
          >
              {!isVisible ? (
                  <SmartToyRoundedIcon />
              ) : isGptMode ? (
                  <PsychologyRoundedIcon />
              ) : (
                  <CloseRoundedIcon />
              )}
          </button>

          <div
              className={`chat-container ${isVisible ? "" : "hidden"}`}
              style={{ textAlign: "right" }}
          >
              <div className="chat-header">
                  {/* 챗봇 창 상단에 HELP 버튼 추가 */}
                  <IconButton className="help-button" onClick={handleHelpClick} sx={{color : 'white'}}>
                      <HelpOutlineIcon onClick={handleHelpClick} />
                  </IconButton>
                  
                  <div style={{ textAlign: "left", color: "white", marginRight: "119px" }} >
                  <h3>GAGABOT</h3>
                  </div>
              </div>
              <div className="chat-messages" id="chatMessages">
                  {messages.map((message, index) => (
                      <div
                          key={index}
                          className={`chat-message ${message.type}`}
                      >
                          <h4>
                              {message.type === "user" ? "당신" : "Gagabot"}
                          </h4>
                          <p>
                              {message.text.includes("죄송합니다") ? (
                                  <a href="mailto:thega4004@naver.com">
                                      {message.text}
                                  </a>
                              ) : (
                                  message.text
                              )}
                          </p>
                          {message.type === "bot" && message.bubbles && (
                              <div>
                                  {message.bubbles.map(
                                      (bubble, bubbleIndex) => {
                                          if (bubbleIndex === 0) {
                                              // 첫 번째 버블: 웰컴 메시지
                                              return (
                                                  <p key={bubbleIndex}>
                                                      {bubble.data.description}
                                                  </p>
                                              );
                                          } else if (
                                              bubbleIndex === 1 &&
                                              bubble.component.data.contentTable
                                          ) {
                                              // 두 번째 버블: 멀티링크
                                              return bubble.component.data.contentTable.map(
                                                  (contentRow, rowIndex) =>
                                                      contentRow.map(
                                                          (
                                                              contentItem,
                                                              itemIndex
                                                          ) => (
                                                              <a
                                                                  key={`${bubbleIndex}-${rowIndex}-${itemIndex}`}
                                                                  href={
                                                                      contentItem
                                                                          .data
                                                                          .data
                                                                          .action
                                                                          .data
                                                                          .url
                                                                  }
                                                              >
                                                                  {
                                                                      contentItem
                                                                          .data
                                                                          .title
                                                                  }
                                                              </a>
                                                          )
                                                      )
                                              );
                                          } else {
                                              // 그 외 기타 버블 (필요한 경우 추가)
                                              return null;
                                          }
                                      }
                                  )}
                              </div>
                          )}
                      </div>
                  ))}
                  {isTyping && <p className="typing-indicator">챗봇 응답 중...</p>}
                  <div ref={messageEndRef} />
              </div>
              <div className="chat-input">
                  <Button className="toggle-gpt" onClick={handleToggleGpt}>
                      GPT
                  </Button>
                  <form onSubmit={sendMessage}>
                      <TextField
                          type="text"
                          id="messageInput"
                          value={inputText}
                          onChange={handleInput}
                          placeholder="채팅을 입력해주세요~"
                          fullWidth
                      />
                      <Button
                          type="submit"
                          id="sendButton"
                          variant="contained"
                          color="primary"
                      >
                          <IconButton
                              className="submit"
                              type="submit"
                              onClick={handleHelpClick}
                          >
                              <SendRoundedIcon onClick={handleHelpClick} />
                          </IconButton>
                      </Button>
                  </form>
              </div>
          </div>
      </div>
  ); 
}
export default Chatbot; 
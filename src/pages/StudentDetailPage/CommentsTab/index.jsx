import { useEffect, useState } from 'react';
import { Tooltip } from 'react-tooltip';

import './styles.scss';

let data = [
    {
        PostedBy: 'Prof. Pedro',
        Comment: 'Mensagem 1',
        PostedAt: '2024-09-9',
        tags: [
            {
                icon: 'Private',
                description: 'Only visible for who posted.'
            }, {
                icon: 'TeacherMeeting',
                description: 'Comment from a teacher meeting.'
            }
        ]
    }, {
        PostedBy: 'Prof. Bruno',
        Comment: 'Mensagem 2',
        PostedAt: '2024-09-10',
        tags: []
    }
]

export default function CommentsTab() {
    const [newComment, setNewComment] = useState('');
    const [comments, setComments] = useState([...data]);

    const [privateComment, setPrivateComment] = useState(false);
    const [teacherMeetingComment, setTeacherMeetingComment] = useState(false);

    const handleAddComment = () => {
        const today = new Date();
        const formattedDate = today.getFullYear() + '-' + String(today.getMonth() + 1).padStart(2, '0') + '-' + String(today.getDate()).padStart(2, '0');

        setComments([...comments, {
            PostedBy: 'Anonymous',
            Comment: newComment,
            PostedAt: formattedDate
        }])
    }

    return (
        <div className='comments-container'>
            <h2>Comments</h2>
            <div className='line' />

            <div className='new-comment-container'>
                <textarea onChange={e => setNewComment(e.target.value)} />
                <div>
                    <span onClick={() => setTeacherMeetingComment(!teacherMeetingComment)}>
                        <i className={`fa-solid fa-people-group button ${teacherMeetingComment && 'button-solid'}`}></i>
                    </span>
                    <span onClick={() => setPrivateComment(!privateComment)}>
                        <i className={`fa-solid fa-lock button ${privateComment && 'button-solid'}`}></i>
                    </span>
                    <button onClick={handleAddComment}>Save</button>
                </div>
            </div>

            <div className='comments'>
                {
                    comments.sort((a, b) => new Date(b.PostedAt) - new Date(a.PostedAt)).map(c =>
                        <div className='comment-container'>
                            <div className='comment-header'>
                                <div className='postedby-tags'>
                                    <h3 className='postedBy'>{c.PostedBy}</h3>
                                    {c.tags?.map(t => <Tag data={t} />)}
                                </div>
                                <p className='postedAt'>{c.PostedAt}</p>
                            </div>
                            <p className='comment'>{c.Comment}</p>
                        </div>
                    )
                }
            </div>
        </div>
    );
}

function Tag({ data }) {
    const key = `tag-tooltip-${data.icon}`;
    const [icon, setIcon] = useState(null);

    useEffect(() => {
        switch (data.icon) {
            case 'Private':
                setIcon('lock');
                break;
            case 'TeacherMeeting':
                setIcon('people-group');
                break;
        }
    }, [data])

    return (
        <div className='tag'>
            <i
                data-tooltip-id={key}
                data-tooltip-content={data.description}
                className={`fa-solid fa-${icon}`}
            />
            <Tooltip
                id={key}
                place='top'
                style={{ backgroundColor: '#333', color: '#fff' }}
            />
        </div>
    );
}

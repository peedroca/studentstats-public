import { useCallback, useEffect, useState } from 'react';
import './styles.scss';

import {
    PolarAngleAxis,
    PolarGrid,
    PolarRadiusAxis,
    Radar,
    RadarChart
} from 'recharts';
import { Link } from 'react-router-dom';
import api from '../../../services/api';

export default function StudentDetail({ data, handleCloseProfile }) {
    const [image, setImage] = useState(null);
    const [isPreview, setIsPreview] = useState(false);
    const [showImagePaste, setShowImagePaste] = useState(false);
    const [base64, setBase64] = useState('');

    const handleImagePaste = async (event) => {
        const items = event.clipboardData.items;
        if (items) {
            for (let i = 0; i < items.length; i++) {
                if (items[i].type.indexOf('image') !== -1) {
                    const blob = items[i].getAsFile();
                    if (blob) {
                        processImage(blob);
                    }
                }
            }
        }
    };

    const processImage = (file) => {
        setImage(file);

        const reader = new FileReader();
        reader.onloadend = () => {
            setBase64(reader.result);
        };
        reader.readAsDataURL(file);

        setIsPreview(true);
    };

    const handleResetImage = useCallback(() => {
        setImage(data?.Image);
        setIsPreview(false);
    }, [data])

    const handleImageUpdate = () => {
        const body = {
            studentClass: data.StudentClass,
            studentNumber: data.StudentNumber,
            studentName: data.StudentName,
            imageBase64: base64,
        };

        api
            .post('/studets/update-image', body)
            .then(() => {
                setIsPreview(false);
                setImage("https://img.icons8.com/?size=512&id=63312&format=png");
            })
            .catch(e => alert(e));
    }

    useEffect(() => {
        handleResetImage()
    }, [data, handleResetImage])

    return data && (
        <div className='student-detail-container'>
            {image && (
                <div>
                    <img
                        src={isPreview ? URL.createObjectURL(image) : image}
                        alt={`${data.StudentName}'s profile`}
                        style={{ width: '300px', height: '270px' }}
                    />
                </div>
            )}
            <div className='info'>
                <div>
                    <p className='name limited-lines'>{data.StudentName}</p>
                    <p className='class'>Class: {data.StudentClass}</p>
                    <p className='number'>Number: {data.StudentNumber}</p>
                </div>
                <div className='actions'>
                    {
                        !isPreview ?
                            <>
                                <Link 
                                    to={`/detail?class=${data.StudentClass}&number=${data.StudentNumber}`}
                                    className='link-student-detail'
                                >
                                    <span>
                                        <i className='fa-solid fa-id-card button'></i>
                                    </span>
                                </Link>
                                <span onClick={handleCloseProfile}>
                                    <i className={`fa-solid fa-close button`}></i>
                                </span>
                            </>
                            :
                            <>
                                <span onClick={handleResetImage}>
                                    <i className='fa-solid fa-close button'></i>
                                </span>
                                <span onClick={handleImageUpdate}>
                                    <i className='fa-solid fa-check button button-solid'></i>
                                </span>
                            </>
                    }


                </div>
                {
                    showImagePaste &&
                    <div
                        onPaste={handleImagePaste}
                        style={{
                            border: '2px dashed #aaa',
                            padding: '20px',
                            marginTop: '20px',
                            cursor: 'pointer',
                        }}
                    >
                        <p className='limited-lines'>Paste an image here</p>
                    </div>
                }
            </div>
            <div className='graph'>
                <RadarChart width={480} height={280} outerRadius="80%" data={data.stats}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="subject" />
                    <PolarRadiusAxis />
                    <Radar name="Prof. Bruno" dataKey="ProfBruno" stroke="#000" fill="#8884d8" fillOpacity={0.6} />
                </RadarChart>
            </div>
        </div>
    );
}
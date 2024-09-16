import { useState } from 'react';
import SearchButton from '../../../components/SearchButton';
import './styles.scss';

export default function StudentTable({ data, studentSelected, handleSelectStudent }) {
    const [field, setField] = useState(null);
    const [searchText, setSearchText] = useState(null);

    const handleSearch = (field, searchText) => {
        setField(field);
        setSearchText(searchText);
    }

    const filterStudents = (item) => {
        if (searchText === null || searchText === undefined || searchText === '') {
            return item;
        } else {
            return item[`Student${field}`].toString().toLowerCase().includes(searchText.toLowerCase())
                ? item
                : null
        }
    };

    return (
        <div className={`table-container ${studentSelected && 'student-selected'}`}>
            <SearchButton
                placeHolder='Serach for student info...'
                handleSearch={handleSearch}
            />

            <h2>Students <small>{data?.filter(filterStudents)?.length ?? 0} records founded.</small></h2>
            <table className='responsive-table'>
                <tr className='table-header'>
                    <td className='col col-1'>Class</td>
                    <td className='col col-2'>Number</td>
                    <td className='col col-3'>Name</td>
                </tr>
                {
                    data && data.filter(filterStudents).map(item => {
                        const isSelected =
                            studentSelected?.StudentNumber === item?.StudentNumber
                            && studentSelected?.StudentClass === item?.StudentClass;

                        return (
                            <tr
                                key={item.StudentNumber + item.StudentClass}
                                className={`table-row ${isSelected && 'tr-selected'}`}
                                onClick={() => handleSelectStudent(item)}
                            >
                                <td className='col col-1' data-label='Class'>{item.StudentClass}</td>
                                <td className='col col-2' data-label='Number'>{item.StudentNumber}</td>
                                <td className='col col-3' data-label='Name'>{item.StudentName}</td>
                            </tr>
                        );
                    })
                }
            </table>
        </div>
    );
}

import { useState } from 'react';
import './styles.scss';

export default function SearchButton({ placeHolder, handleSearch }) {
    const [field, setField] = useState('Class');
    const [searchText, setSearchText] = useState('');

    return (
        <div className='search-button-container'>
            <select name="fields" defaultValue='Class' onChange={(e) => setField(e.target.value)}>
                <option value="Class">Class</option>
                <option value="Number">Number</option>
                <option value="Name">Name</option>
            </select>
            <input
                placeholder={placeHolder}
                onChange={(e) => setSearchText(e.target.value)}
                value={searchText}
            />
            {
                searchText != '' && searchText != null &&
                <span onClick={() => setSearchText('')}>
                    <i class="fa-regular fa-circle-xmark button"></i>
                </span>
            }
            <span onClick={() => handleSearch(field, searchText)}>
                <i class='fa-solid fa-magnifying-glass button'></i>
            </span>
        </div>
    );
}
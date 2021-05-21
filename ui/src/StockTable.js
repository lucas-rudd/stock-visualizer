import React, { useCallback, useRef, useState } from 'react';
import { slide as Menu } from 'react-burger-menu';
import { formatStockData } from './helpers/formatStockData';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons'

export default ({ data }) => {
    const formattedData = formatStockData(data);
    const [sortBy, setSortBy] = useState('Name');
    const [arrowIcon, setArrowIcon] = useState(faArrowUp);
    const [sortOrder, setSortOrder] = useState('asc');

    const sort = useCallback((data) => {
        switch(sortBy) {
            case 'Name':
                return data.sort((a, b) => {
                    if(a.label === b.label) {
                        return 0;
                    }
                    if(a.label < b.label) {
                        return sortOrder === 'asc' ? -1 : 1;
                    }
                    return sortOrder === 'asc' ? 1 : -1;
                });
            case 'SentimentScore':
                return data.sort((a, b) => {
                    if(a.x === b.x) {
                        return 0;
                    }
                    if(a.x < b.x) {
                        return sortOrder === 'asc' ? 1 : -1;
                    }
                    return sortOrder === 'asc' ? -1 : 1;
                });
            case 'NumberOfMentions':
                return data.sort((a, b) => {
                    if(a.z === b.z) {
                        return 0;
                    }
                    if(a.z < b.z) {
                        return sortOrder === 'asc' ? 1 : -1;
                    }
                    return sortOrder === 'asc' ? -1 : 1;
                })
            default:
                return data.sort((a, b) => {
                    if(a.label === b.label) {
                        return 0;
                    }
                    if(a.label < b.label) {
                        return sortOrder === 'asc' ? -1 : 1;
                    }
                    return sortOrder === 'asc' ? 1 : -1;
                });
        }   
    }, [sortBy, sortOrder]);

    const sortDirection = useCallback(() => {
        const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
        setArrowIcon(newSortOrder=== 'asc' ? faArrowUp : faArrowDown);
        setSortOrder(newSortOrder)
    }, [setArrowIcon, setSortOrder, sortOrder])

    const onMouseEnter = (stock, ref) => {
        ref.current.innerHTML = `<b>${stock.label}</b><br>Sentiment Score ${stock.x}<br>Times Mentioned: ${stock.y}`;
        ref.current.style.border = '1px solid white';
        ref.current.style.padding = '10px 10px 10px 10px';
    }

    const onMouseLeave = (stock, ref) => {
        ref.current.innerHTML = `${stock.label}`;
        ref.current.style.border = '';
        ref.current.style.padding = '';
    }
  return (
    <Menu>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label className='bm-select label'>Sort By:</label>
            <div style={{ display: 'flex' }}>
                <select className='bm-select' onChange={(e) => setSortBy(e.target.value)}>
                    <option value="Name">Name</option>
                    <option value="SentimentScore">Sentiment Score</option>
                    <option value="NumberOfMentions">Number of Mentions</option>
                </select>
                <div onClick={sortDirection}>
                {sortOrder} <FontAwesomeIcon icon={arrowIcon} style={{ padding: '2px 2px 2px 2px'}}/>
                </div>
                
            </div>
        </div>
        {sort(formattedData).map(stock => {
            const ref = useRef();
        return (<a className='menu-item' ref={ref} id={stock.label} onMouseLeave={() => onMouseLeave(stock, ref)} onMouseEnter={() => onMouseEnter(stock, ref)} href={`https://stockanalysis.com/stocks/${stock.label}`}>
            {stock.label}
        </a>)
        }
    )}
    </Menu>
  );
};
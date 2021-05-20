import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import { formatStockData } from './helpers/formatStockData';

export default ({ data }) => {
    const formattedData = formatStockData(data);
    let refs = {}

    const onMouseEnter = (stock, ref) => {
        console.log('REF', ref);
        ref.current.innerHTML = `<b>${stock.label}</b><br>Sentiment Score ${stock.x}<br>Times Mentioned: ${stock.y}<br>`
    }

    const onMouseLeave = (stock, ref) => {
        ref.current.innerHTML = `${stock.label}`;
    }
  return (
    <Menu>
        {formattedData.sort((a, b) => {
            if(a.label === b.label) {
                return 0;
            }
            if(a.label < b.label) {
                return -1;
            }
            return 1;
        }).map(stock => {
            const ref = React.createRef();
            refs[stock.label] = ref;
        return (<a className="menu-item" ref={ref} id={stock.label} onMouseLeave={() => onMouseLeave(stock, ref)} onMouseEnter={() => onMouseEnter(stock, ref)} href="/">
            {stock.label}
        </a>)
        }
    )}
    </Menu>
  );
};
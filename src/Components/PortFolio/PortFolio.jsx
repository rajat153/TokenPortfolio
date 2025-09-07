import React from 'react'
import Chart from '../Charts/Chart'
import './PortFolio.css'
import { useSelector } from 'react-redux'

const PortFolio = () => {
    const { watchlist } = useSelector((store) => store.data);
    console.log("SAA", watchlist)
    const totalPortfolioSum = watchlist.reduce((acc, cumm)=>acc + cumm.value , 0);
    const lastUpdateDate = watchlist[0]?.last_updated;
    console.log("Aaa", totalPortfolioSum)
  return (
    <section className='section'>
      <div className='left'>
        <div>
        <span>PortFolio Total</span>
        <p>${totalPortfolioSum.toFixed(2)}</p>
        </div>
        <span>Last updated: {lastUpdateDate && new Date(lastUpdateDate).toLocaleTimeString("en-IN", {
          timeZone: "Asia/Kolkata",
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
          hour12: true
        }).toUpperCase()}</span> 
      </div>
      <div className='right'>
        <Chart/>
        {/* <ul className='watchlist-breakdown'>
          {watchlist.length > 0 && watchlist.map((item)=>{
            return <li>{ totalPortfolioSum > 0 &&  `${((item.value/totalPortfolioSum)*100).toFixed(2)}%`}</li>
          })}
        </ul> */}
        <ul className="watchlist-breakdown">
  {watchlist.length > 0 &&
    watchlist.map((item) => {
      const percent =
        totalPortfolioSum > 0
          ? `${((item.value / totalPortfolioSum) * 100).toFixed(2)}%`
          : "0%";

      return (
        <li key={item.id}>
          <span className='token_name'>{`${item.name} (${item.symbol.toUpperCase()})`}</span>
          <span>{percent}</span>
        </li>
      );
    })}
</ul>
      </div>
    </section>
  )
}

export default PortFolio
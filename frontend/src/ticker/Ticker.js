
import React, { useState, useEffect } from 'react';
import axios from 'axios';
// eslint-disable-next-line
import ApexCharts from 'react-apexcharts';
import "./ticker.css";

const StockData = () => {
  const [data, setData] = useState([]);
  const [symbols, setSymbols] = useState('');
  
  const [options, setOptions] = useState({});

  const [volumeOptions, setVolumeOptions] = useState({});

  
  
  useEffect(() => {
    fetchData();
  // eslint-disable-next-line  
  }, []);


    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/ticker/api/data/${symbols}`); 
        setData(response.data.data); 
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

  // Function to extract specific fields from the JSON data
  const extractFields = (data) => {
    if (!data) return [];
    return data.map(item => ({
      x: new Date(item.date),
      y: [item.open, item.high, item.low, item.close]
    }));
  };
    
  const extractVolumeFields = (data) => {
    if (!data) return [];
    return data.map(item => ({
      x: new Date(item.date),
      y: item.volume
    }));
  }; 

    // Extract specific fields from the fetched data
    const extractedData = extractFields(data);
    const extractedVolumeData = extractVolumeFields(data);

    const handleSymbolChange = (event) => {
      setSymbols(event.target.value);
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
      fetchData();
    };

  // Define chart options for candlestick chart
  useEffect(() => {
    setOptions({
      chart: {
        type: 'candlestick',
        height: 350,
      },
      xaxis: {
        type: 'datetime' // Use datetime for x-axis
      },
      yaxis: {
        title: {
          text: 'Price',
          tooltip: {
            enabled: true
          }
        }
      },
      title: {
        text: `${symbols} Candlestick Chart`, // Dynamic title with symbol
        align: "center"
      },
    });
  }, [symbols]); // Re-render chart options when symbols change


  useEffect(() => {
    setVolumeOptions({
      chart: {
        type: 'bar',
        height: 200,
      },
      xaxis: {
        type: 'datetime' // Use datetime for x-axis
      },
      yaxis: [
        {
          name: 'Volume',
          title: {
            text: 'Volume (1000 sh)'
          },
          labels: {
            formatter: function (val) {
              return val.toFixed(0)/1000; // Format price values with 0 decimal places
            }
          }
        }
      ],
      title: {
        text: `${symbols} Volume Chart`,
        align: "center"
      },
    });
  }, [symbols]); // Re-render chart options when symbols change
  



  return (
    <div>
      <h3 className='login'>Stock Data</h3>
      <form onSubmit={handleSubmit} className='login'>
        <input className='login' type="text" value={symbols} onChange={handleSymbolChange} placeholder="Enter ticker symbol" />
        <button className='login' type="submit">Fetch Data</button>
      </form>
      {extractedData.length > 0 && (
        <ApexCharts
          options={options}
          series={[
            { // Candlestick data
              name: 'Price',
              type: 'candlestick',
              data: extractedData
            },
            
          ]}
          type="candlestick"
          height={350}
        />
      )}
    <div>
    {extractedVolumeData.length > 0 && (
        <ApexCharts
          options={volumeOptions}
          series={[  // volume data
            { 
              name: 'Volume',
              type: 'bar',
              data: extractedVolumeData
            }
          ]}
          height={200}
        />
      )}
    </div>
    </div>
  );
};

export default StockData;
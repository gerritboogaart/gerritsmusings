import React, { Component } from "react";
import axios from 'axios';
import { AreaChart, XAxis, YAxis, CartesianGrid, Tooltip, Area } from 'recharts';
import Hourly from '../Hourly/Hourly';
import { Icon, Input, Button } from 'semantic-ui-react';
import { calcTemp, calcAmPm, renderToday } from '../../Utils/Temperature';
import { DAYS } from '../../Constants/constants';
import { MOCK } from '../../Constants/mockdata';
import { fetchWeatherApi } from 'openmeteo';
import { clone } from 'lodash';
import './WeatherApp.css';

// const params = {
// 	"latitude": 36.8506,
// 	"longitude": -75.9779,
// 	"daily": ["temperature_2m", "apparent_temperature", "precipitation_probability"],
// 	"temperature_unit": "fahrenheit",
// 	"wind_speed_unit": "mph",
//   "format": 'json'
// };

// const URL = "https://api.open-meteo.com/v1/forecast";
// const responses = () => fetchWeatherApi(URL, params);



// 51.44083, 5.47778
const locations = {
  eindhoven: {
    name: 'Eindhoven',
    long: 5.47778,
    lat: 51.44083
  },
  vabeach: {
    name: 'Virginia Beach',
    long: -75.9779,
    lat: 36.8506
  },
  newyork: {
    name: 'New York City',
    long: -74.00597,
    lat: 40.71427
  }
}

class WeatherApp extends Component {
  constructor() {
    super();
    this.state = {
      response: false,
      endpoint: "",
      temp: 'F',
      uri: URL,
      loc_uri: 'https://gerritsmusing-api-1735bf43ab0c.herokuapp.com/location?place=',
      location: 'vabeach',
      locations: locations,
      loading: false,
      place: '',
      type: 'forecast',
      timezone: 'America/New_York'
    };
  }

  componentDidMount = () => {
    const mobile = window.navigator.userAgent;
    const mob = mobile.includes('iPhone') || mobile.includes('Android');
    this.setState({ isMobile: mob });
    if (process.env.NODE_ENV === 'testdevelopment') {
      const { daily } = MOCK;
      const extraDay = daily.data.map(day => {
        const time = new Date(day.time * 1000);
        const curtime = `${time.getMonth() + 1}/${time.getDate()}`;
        const dow = DAYS[time.getDay()];
        const useDay = `${dow} ${curtime}`;
        return { ...day, useDay };
      });
      this.setState({ timezone: 'America/New_York', response: MOCK, loading: false, days: extraDay });
    } else {
      this.getWeatherUpdate();
    }
  };
  getWeatherUpdate = async () => {
    const { uri, location, locations } = this.state;
    const long = locations[location].long;
    const lat = locations[location].lat;
    // const url = `${uri}${lat},${long}`;


    const params = {
      "latitude": 52.52,
      "longitude": 13.41,
      "daily": ["temperature_2m_max", "temperature_2m_min", "uv_index_max", "precipitation_sum"],
      "temperature_unit": "fahrenheit",
      "wind_speed_unit": "mph",
      "temporal_resolution": "hourly_6",
      "format": "json"
    };
    const url_a = "https://api.open-meteo.com/v1/forecast?"
    const url_b = `latitude=${lat}&longitude=${long}`
    const url_c = "&daily=temperature_2m_max%2Ctemperature_2m_min%2Cuv_index_max%2Cprecipitation_sum&temperature_unit=fahrenheit&wind_speed_unit=mph&temporal_resolution=hourly_6&format=json";
    const result = await axios.get(url_a + url_b + url_c);

    console.log(result)

    // const responses = await fetchWeatherApi(URL, params);
    // console. log(responses[0])
    // const hourly = responses.hourly();
    // console.log(hourly)

    this.setState({ timezone: result.data.timezone, response: result.data, loading: false, days: result.data.daily });

    // responses().then(result => {
    //   console.log(result)
    //     const { daily } = result.data;
    //     const extraDay = daily.data.map(day => {
    //       const time = new Date(day.time * 1000);
    //       const curtime = `${time.getMonth() + 1}/${time.getDate()}`;
    //       const dow = DAYS[time.getDay()];
    //       const useDay = `${dow} ${curtime}`;
    //       return { ...day, useDay };
    //     });
    //     this.setState({ timezone: result.data.timezone, response: result.data, loading: false, days: extraDay });
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   })
  }

  changeLocation = (loc) => this.setState({ location: loc }, () => this.getWeatherUpdate());

  renderLoading = () => {
    if (!this.state.loading) this.setState({ loading: true }, () => <div>Loading new city data...</div>);
  }

  getTemp = () => {
    // const { longitude, latitude, currently } = this.state.response;
    const { locations } = this.state;
    // if (longitude.toString() !== locations[location].long.toString() || latitude.toString() !== locations[location].lat.toString()) return this.renderLoading();
    const { currently } = this.state.response;
    const t = parseFloat(currently.temperature);
    const { temp, deg } = calcTemp(t, this.state.temp);
    const time = new Date();
    const curtime = `${time.getMonth() + 1}/${time.getDate()}/${time.getFullYear()}`;
    const minutes = time.getMinutes() < 10 ? `0${time.getMinutes()}` : time.getMinutes();
    // let hours = time.getHours() < 10 ? `0${time.getHours()}` : time.getHours();
    const sec = time.getSeconds() < 10 ? `0${time.getSeconds()}` : time.getSeconds();
    const { hours, ampm } = calcAmPm(time);

    const clock = `${hours}:${minutes}:${sec} ${ampm}`;
    const locale = time.toLocaleString('en-US', { timeZone: this.state.timezone })

    return (
      <div>
        <p>The situation in <span style={{ fontWeight: 'bold' }}>{locations[this.state.location].name}</span> is:</p>
        <p><span style={{ fontWeight: 'bold' }}>Temperature:</span> {temp} {deg}</p>
        <p><span style={{ fontWeight: 'bold' }}>Weather:</span> {currently.summary}</p>
        <p><span style={{ fontWeight: 'bold' }}>Date:</span> {curtime}</p>
        <p><span style={{ fontWeight: 'bold' }}>Time:</span> {clock}</p>
        <p><span style={{ fontWeight: 'bold' }}>Local Time:</span><br />{locale}</p>
      </div>
    );
  }

  renderDays = () => {
    const { daily } = this.state.response;
    if (!daily || this.state.loading) return <div />;
    const { data } = daily;
    return data.map((day, i) => {
      const time = new Date(day.time * 1000);
      const max = calcTemp(parseFloat(day.temperatureHigh), this.state.temp);
      const min = calcTemp(parseFloat(day.temperatureLow), this.state.temp);
      // const rainC = day.precipProbability > 0.04 ? parseFloat(day.precipProbability) * 100 : 0;

      return (
        <div key={i} className='day-holder' >
          <div className='top-day'>
            <ul className='day-ul'>
              <li style={{ fontWeight: 'bold' }}>{renderToday(time, i)}</li>
              <li><span className='summary'>{day.summary}</span></li>
            </ul>
          </div>
          <div className='bottom-day'>
            <ul className='day-ul'>
              <hr />
              <li>Max: {max.temp} {max.deg}</li>
              <li>Min: {min.temp} {min.deg}</li>
            </ul>
            <div className={`weather ${day.icon}`}></div>
            {/* <div className='perc'>{rainC.toFixed(0)}%</div> */}
          </div>
        </div>
      )
    })
  }

  isSelected = (loc) => loc === this.state.location ? 'location-button selected' : 'location-button';

  renderLocations = () => {
    const { locations } = this.state;
    if (this.state.loading) return <div />;
    const locs = Object.keys(locations);

    return locs.map(loc => (
      <li key={`1${loc}`}><button className={this.isSelected(loc)} key={loc} onClick={() => this.changeLocation(loc)} >{locations[loc].name}</button></li>
    ));
  }

  changeTemp = () => this.setState({ temp: this.state.temp === 'C' ? 'F' : 'C' });

  renderGraphs = () => {
    const data = this.state.days;
    if (!data || this.state.loading) return <div />;
    // const data = daily.data;
    return (
      <AreaChart width={730} height={250} data={data}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#11a9c2" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#11a9c2" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#235c67" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#235c67" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="useDay" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Area type="monotone" dataKey="temperatureHigh" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
        <Area type="monotone" dataKey="temperatureLow" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
      </AreaChart>
    )
  }

  setlookupplace = (e) => {
    const value = e.target.value;
    if (value && value.length > 1) this.setState({ place: value });
  }

  lookupcheck = (e) => {
    if (e.key === 'Enter') this.lookupplace();
  }

  lookupplace = (e) => {
    const { place, loc_uri, locations } = this.state;
    const uriPlace = encodeURI(place);
    const url = `${loc_uri}${uriPlace}`;
    axios.get(url)
      .then(result => {
        if (result.data.results.length < 1) {
        } else {
          const res = result.data.results[0];
          const { location } = res.geometry;
          const newLocs = clone(locations);
          const name = res.address_components[0].short_name;
          if (!newLocs[name]) {
            newLocs[name] = {
              name: name || res.formatted_address,
              long: location.lng,
              lat: location.lat
            }
          }
          this.setState({ location: name, locations: newLocs }, () => this.getWeatherUpdate());
        }
      })
      .catch(error => {
        console.log(error);
      })
  }

  renderForecast = () => {
    return (
      <div className='daysforcast'>
        {this.renderDays()}
      </div>
    )
  }

  renderTypeGraph = () => {
    return (
      <div className='graph'>
        {this.renderGraphs()}
      </div>
    )
  }

  renderTypeTable = () => {
    const { response, loading, temp } = this.state;
    return (
      <div className='hours-holder'>
        <Hourly hourly={response.hourly} loading={loading} tempType={temp} />
      </div>
    )
  }

  renderType = () => {
    switch (this.state.type) {
      case 'forecast':
        return this.renderForecast();
      case 'graph':
        return this.renderTypeGraph();
      case 'table':
        return this.renderTypeTable();
      default:
        return this.renderForecast();
    }
  }

  render() {
    const { response, loading } = this.state;
    return (
      <div className='weatherWeatherApp'>
        {response && !loading
          ?
          <div>
            {
              this.state.isMobile ?
                <React.Fragment>
                  <Input
                    icon
                    onChange={this.setlookupplace}
                    onKeyPress={this.lookupcheck}
                    placeholder='Enter city name or zip code'
                    style={{ margin: '1rem auto', width: '98%' }}
                  >
                    <input />
                    <Icon
                      link
                      name='search'
                      onClick={() => this.lookupplace()}
                    />
                  </Input>

                  <div className='graph-options'>
                    <Button className='temp-button' onClick={() => this.changeTemp()} >{this.state.temp}</Button>
                    <Button onClick={() => this.setState({ type: 'forecast' })}>
                      Daily
                  {/* <Icon name='calendar alternate' /> */}
                    </Button>

                    <Button onClick={() => this.setState({ type: 'table' })}>
                      Hourly
                  {/* <Icon name='table' /> */}
                    </Button>
                    <Button onClick={() => this.setState({ type: 'graph' })}>
                      Graph
                  {/* <Icon name='area graph' /> */}
                    </Button>
                  </div>
                </React.Fragment>

                :
                <div className='topnav'>
                  <Button className='temp-button' onClick={() => this.changeTemp()} >{this.state.temp}</Button>
                  <Input
                    icon
                    onChange={this.setlookupplace}
                    onKeyPress={this.lookupcheck}
                    placeholder='Enter city name or zip code'
                    style={{ marginRight: '1rem' }}
                  >
                    <input />
                    <Icon
                      link
                      name='search'
                      onClick={() => this.lookupplace()}
                    />
                  </Input>
                  <div className='graph-options'>
                    <Button icon labelPosition='right' onClick={() => this.setState({ type: 'forecast' })}>
                      7 Day Forecast
                  <Icon name='calendar alternate' />
                    </Button>

                    <Button icon labelPosition='right' onClick={() => this.setState({ type: 'table' })}>
                      Hourly Forecast
                  <Icon name='table' />
                    </Button>
                    <Button icon labelPosition='right' onClick={() => this.setState({ type: 'graph' })}>
                      7 Day Graph
                  <Icon name='area graph' />
                    </Button>
                  </div>
                </div>
            }

            <div style={{ display: 'flex', paddingTop: '3rem' }}>
              <div className='response'>
                {this.getTemp()}
              </div>
              {this.renderType()}
            </div>
          </div>
          : <p>Loading...</p>}
      </div>


    );
  }
}
export default WeatherApp;
import {PageProps} from 'gatsby'
import React from "react"

type City = "London" | "New York"

const TypeScript: React.FC<PageProps> = () => {
  let city: City;
  city = "New York"
  console.log(city);
  
  return <div>Hello world!</div>
}

export default TypeScript;
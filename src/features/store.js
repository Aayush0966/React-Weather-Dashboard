import { configureStore } from "@reduxjs/toolkit";
import { weatherReducer } from "./WeatherSlice";

export const store = ( {
     reducer : {
       Weather: weatherReducer
    }
}
   
)
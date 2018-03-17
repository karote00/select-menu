import React, { Component } from 'react';
import FA from 'react-fontawesome';

export const isFA = iconStr => iconStr.indexOf('fa-') > -1;
export const FAIcon = (iconStr, options) => (<FA name={iconStr.substr(3)} {...options} />);
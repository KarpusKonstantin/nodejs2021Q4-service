import fs from 'fs';

export interface IMessage {
  method?: string;
  url?: string;
  params?: string;
  query?: string;
  body?: string;
  status: number;
  message?: string;
  executeTime?: string;
}

const  dateFormat = (date: Date): string => {

  if (date !== undefined) {
    // date.setSeconds(date.getSeconds() + date.getTimezoneOffset() * 60 + weatherPage.loadData.offset_sec);

    const monthNum = date.getMonth() + 1;
    const dayNum = date.getDay();
    const day = date.getDate();
    const year = date.getFullYear();

    // const dayName = vocabulary.dayNameSmallArray[weatherPage.lang][dayNum];
    // const monthName = vocabulary.monthName[weatherPage.lang][monthNum];

    const hours = (date.getHours() < 10) ? `0${  date.getHours()}` : date.getHours();
    const minutes = (date.getMinutes() < 10) ? `0${  date.getMinutes()}` : date.getMinutes();
    const seconds = (date.getSeconds() < 10) ? `0${  date.getSeconds()}` : date.getSeconds();

    // return  dayName + ' ' + day + ' ' + monthName + ' ' + hours + ':' + minutes + ':' + seconds;

    return `${day  }.${  monthNum  }.${  year  } ${  hours  }:${  minutes  }:${  seconds}`;

  }
    return '';

}


export class MyLogger {
  logLevel: number;
  saveLogToFile: boolean;
  saveErrorToFile: boolean;
  viewLogToConsole: boolean;

  constructor(logLevel: number, viewLogToConsole: boolean, saveLogToFile: boolean, saveErrorToFile: boolean) {
    this.logLevel = logLevel;
    this.saveErrorToFile = saveErrorToFile;
    this.saveLogToFile = saveLogToFile;
    this.viewLogToConsole = viewLogToConsole;
  }

  private logMessage(message: IMessage): string {
    let result = `[${dateFormat(new Date())}] - `;

    if (message.method && message.method !== '') {
      result += `Method: ${message.method} `
    }

    if (message.url && message.url !== '') {
      result += `URL: ${message.url} `
    }

    if (message.params && message.params !== '') {
      result += `Params: ${message.params} `
    }

    if (message.query && message.query !== '') {
      result += `Query: ${message.query} `
    }

    if (message.body && message.body !== '') {
      result += `Body: ${message.body} `
    }

    if (message.status) {
      result += `Status: ${message.status} `
    }

    if (message.message && message.message !== '') {
      result += `Message: ${message.message} `
    }

    if (message.executeTime && message.executeTime !== '') {
      result += `ExecuteTime: ${message.executeTime} `
    }

    return `${result  }\n`;
  }

  private saveToFile(fileName: string, log: string) {
    fs.writeFile(fileName, log, { flag: 'a', encoding: 'utf8' },
      (err) => {
        if (err)
          console.log(err);
      })
  }

  logResult(message: IMessage) {
    const log: string = this.logMessage(message);


    if ((this.saveLogToFile) && (message.status < 400) && (this.logLevel > 0)) {
      if (this.viewLogToConsole) {
        console.log(log);
      }

      this.saveToFile('logs.log', log)
    }

    if ((this.saveErrorToFile) && (message.status > 399)) {
      if (this.viewLogToConsole) {
        console.log(log);
      }

      this.saveToFile('error.log', log)
    }
  }


}


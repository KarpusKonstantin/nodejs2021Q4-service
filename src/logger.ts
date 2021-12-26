import { Context } from 'koa';
import fs from 'fs';

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



  private logMessage(ctx: Context, executeTime: string): string {
    const params = JSON.stringify(ctx.params);
    const body = JSON.stringify(ctx.body);
    const query = JSON.stringify(ctx.query);

    return `[${dateFormat(new Date())}] - Method: ${ctx.request.method}, Url: ${ctx.request.url}, Params: ${params}, Query: ${query}, Body: ${body}, Status: ${ctx.response.status}, Message: ${ctx.response.message}, ExecTime: ${executeTime} \n`;
  }

  private saveToFile(fileName: string, log: string) {
    fs.writeFile(fileName, log, { flag: 'a', encoding: 'utf8' },
      (err) => {
        if (err)
          console.log(err);
      })
  }

  logResult(ctx: Context, executeTime: string) {
    const log: string = this.logMessage(ctx, executeTime);

    if (this.viewLogToConsole) {
      console.log(log);
    }

    if ((this.saveLogToFile) && (ctx.status < 400)) {
      this.saveToFile('logs.log', log)
    }

    if ((this.saveErrorToFile) && (ctx.status > 399)) {
      this.saveToFile('error.log', log)
    }
  }


}


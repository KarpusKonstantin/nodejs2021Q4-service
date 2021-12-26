import { Context } from 'koa';
import fs from 'fs';

export default class MyLogger {
  logLevel: number;
  saveLogToFile: boolean;
  saveErrorToFile: boolean;

  constructor(logLevel: number, saveLogToFile: boolean, saveErrorToFile: boolean) {
    this.logLevel = logLevel;
    this.saveErrorToFile = saveErrorToFile;
    this.saveLogToFile = saveLogToFile;
  }

  logMessage(ctx: Context, executeTime: string): string {
    const params = JSON.stringify(ctx.params);
    const body = JSON.stringify(ctx.body);
    const query = JSON.stringify(ctx.query);

    return `Method: ${ctx.request.method}, Url: ${ctx.request.url}, Params: ${params}, Query: ${query}, Body: ${body}, Status: ${ctx.response.status}, ExecTime: ${executeTime} \n`;
  }

  logResult(ctx: Context, executeTime: string) {
    const log: string = this.logMessage(ctx, executeTime);
    console.log(log);

    if (this.saveLogToFile) {
      fs.writeFile('logs.log', log, { flag: 'a', encoding: 'utf8' },
        (err) => {
          if (err)
            console.log(err);
        })
    }

    if (this.saveErrorToFile) {

    }
  }


}


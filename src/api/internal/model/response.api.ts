import { HttpErrorResponse, HttpResponse } from "@angular/common/http";

export class ResponseAPI<T = any> {
  timestamp?: string;
  data?: T;
  success?: boolean;
  path?: string;
  statusCode?: number;
  message?: string | string[];
  messageError?: string
  constructor(response?: HttpResponse<any> | any,error: boolean = false) {
    if (error) {
      const ne = response.error as IErroApi;
      this.timestamp = ne.timestamp;
      this.message = ne.message;
      this.messageError = response.message;
      this.success =  ne.success;

    }else if(response?.body) {
      const ne = response as HttpResponse<any>;
      this.data = ne.body.data;
      this.timestamp = ne.body.timestamp;
      this.message = ne.body.message;
      this.success =  ne.body.success;
    }
    this.statusCode = response?.status;
  }

  isError(): boolean {
    return this.success === false || !!this.statusCode;
  }

  getMessage(): string {
    if (Array.isArray(this.message)) {
      return this.message.join('\n');
    }
    return this.message || '';
  }

  getData(): T | undefined {
    return this.data ?? undefined;
  }

  hasData(): boolean {
    return !!this.data;
  }
}

export interface IErroApi {
    success:    boolean;
    timestamp:  string;
    path:       string;
    statusCode: number;
    message:    string;
}
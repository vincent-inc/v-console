import { Injectable, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs';

export interface File {
  name: string,
  type: string,
  extension: string,
  rawFile?: globalThis.File;
  value: string;
}

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  static async getRouteParam(route: ActivatedRoute, variable: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      route.params.pipe(first()).subscribe(
        params => {
          let value = params[variable];
          resolve(value);
        },
        error => { reject('') }
      );
    })
  }

  patch(object: any, target: any): void {
    if (typeof object !== typeof target || JSON.stringify(object) !== JSON.stringify(target))
      return;

    if (typeof object === 'object') {

    }
    else {

    }
  }

  saveFile(fileName: string, fileType: string, fileContent: string) {
    const file = new Blob([fileContent], { type: fileType });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(file);
    link.download = fileName;
    link.click();
    link.remove();
  }

  async uploadFile(accept: string): Promise<File> {
    return new Promise<File>((resolve, reject) => {
      let fileInput = document.createElement("input");
      fileInput.accept = accept;
      fileInput.type = 'file';
      fileInput.click();

      fileInput.onchange = (e) => {
        let rawFile = fileInput.files![0];
        let fileName = rawFile.name;
        let fileType = rawFile.type;
        let lastIndex = fileName.lastIndexOf('.') > 0 ? fileName.lastIndexOf('.') + 1 : fileName.length;
        let extension = fileName.substring(lastIndex);

        let reader = new FileReader();

        reader.onload = () => {
          let value: string = reader.result && typeof reader.result === 'string' ? reader.result : '';
          let file: File = {
            name: fileName,
            type: fileType,
            rawFile: rawFile,
            value: value,
            extension: extension
          }

          fileInput.remove();
          resolve(file);
        };
        reader.readAsText(rawFile);
      };
    });
  }

  static isNotEqual(obj1: any, obj2: any) {
    return JSON.stringify(obj1) !== JSON.stringify(obj2);
  }

  static isEqual(obj1: any, obj2: any) {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
  }

  static localStorageSetItem(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value))
  }

  static localStorageGetItem<T>(key: string): T | null {
    let value = localStorage.getItem(key);
    if(value) {
      let parseValue: T = JSON.parse(value);
      return parseValue;
    }

    return null;
  }

  static setField(obj: Object, fieldName: string, value: any) {
    Object.defineProperty(obj, fieldName, {
      value: value,
      writable: true,
      enumerable: true,
      configurable: true
    });
  }
}

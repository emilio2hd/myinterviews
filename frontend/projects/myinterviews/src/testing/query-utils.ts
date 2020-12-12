import { DebugElement } from '@angular/core';

export const getAllClasses = (nativeElement: HTMLElement) => nativeElement.getAttribute('class');

export const getInnerText = (de: DebugElement) => {
  if (!de) {
    throw new Error('an instance of DebugElement must be provided');
  }

  return de.nativeElement.innerText;
};

import { DOCUMENT } from '@angular/common';
import { ApplicationRef, ComponentFactoryResolver, ComponentRef, EmbeddedViewRef, Inject, Injectable, Injector, Type } from '@angular/core';

export interface DialogPos {
  top: string;
  left: string;
  width: string;
  height: string;
}

export interface ChildConfig {
  inputs: object;
  outputs: object;
  position?: DialogPos;
}

@Injectable({
  providedIn: 'root'
})
export class DomService {
  private childComponentRef: ComponentRef<any>;
  constructor(
    private resolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector,
    @Inject(DOCUMENT) private document: Document
  ) {}

  public appendComponentTo(parentId: string, child: Type<any>, config: ChildConfig) {
    const childComponentRef = this.resolver.resolveComponentFactory(child).create(this.injector)
    this.attachConfig(config, childComponentRef);
    this.childComponentRef = childComponentRef;
    this.appRef.attachView(childComponentRef.hostView);
    const childDOMElement = (childComponentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
    this.document.getElementById(parentId).appendChild(childDOMElement);
  }

  public attachConfig(config: ChildConfig, componentRef: ComponentRef<any>) {
    const inputs = config.inputs;
    const outputs = config.outputs;
    for (const key in inputs) {
      if (inputs.hasOwnProperty(key)) {
        const element = inputs[key];
        componentRef.instance[key] = element;
      }
    }

    for (const key in outputs) {
      if (outputs.hasOwnProperty(key)) {
        const element = outputs[key];
        componentRef.instance[key] = element;
      }
    }
  }

  public removeComponent() {
    this.appRef.detachView(this.childComponentRef.hostView);
  }
}

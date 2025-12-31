export class MockWorker {
  onmessage: ((ev: MessageEvent) => void) | null = null

  postMessage(_: any) {
    setTimeout(() => {
      this.onmessage?.({ data: true } as MessageEvent)
    }, 0)
  }

  terminate() {}
}

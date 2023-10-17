import baseConfig from "./baseConfig";
import * as vscode from "vscode";
class BookConfig {
  constructor() { }
  config = baseConfig[0];
  choiceConfig() {
    return new Promise(async (resolve) => {
      const sourceList = [...baseConfig];
      const customPath = vscode.workspace.getConfiguration("jiege").get("customSourcePath") + "";
      //获取自定义源
      if (customPath) {
        try {
          const customSource = await import(customPath);
          customSource.forEach((element: any) => {
            sourceList.push(element);
          });
        } catch (err) {
          console.log(err);
        }
      }
      //获取自定义源
      const pickItem: any[] = [];
      sourceList.forEach(({ label }, index) => {
        pickItem.push({ label, index });
      });
      const quickPick = vscode.window.createQuickPick<{
        label: string;
        index: number;
      }>();
      quickPick.title = "选择小说源";
      quickPick.items = pickItem;
      quickPick.onDidChangeSelection(async (selection) => {
        let { label, index } = selection[0];
        this.config = sourceList[index];
        quickPick.dispose();
        resolve(true);
      });
      quickPick.onDidHide(() => {
        quickPick.dispose();
      });
      quickPick.show();
    });
  }
  setConfig(data: any) {
    this.config = data;
  }
}
export default new BookConfig();

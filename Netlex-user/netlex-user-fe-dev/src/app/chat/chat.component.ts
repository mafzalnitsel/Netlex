import {
  Component,
  ElementRef,
  NgZone,
  OnInit,
  ViewChild,
} from "@angular/core";
import { environment } from "src/environments/environment";
import { marked } from "marked";

@Component({
  selector: "app-chat",
  templateUrl: "./chat.component.html",
  styleUrls: ["./chat.component.scss"],
})
export class ChatComponent implements OnInit {
  messages: Array<{
    id: number;
    text: string;
    sender: "user" | "ai";
    isError?: boolean;
  }> = [];
  input = "";
  loading = false;
  error: string | null = null;
  modalVisible = false;

  toggleModal() {
    this.modalVisible = !this.modalVisible;
  }

  @ViewChild("messagesEndRef") messagesEndRef!: ElementRef;

  constructor(private zone: NgZone) {}

  ngOnInit(): void {
    this.addMessage(
      "Välkommen till Netlex. Jag ger tydliga och koncisa svar om svensk lagstiftning. Informationen är avsedd för research och ersätter inte juridisk rådgivning från en kvalificerad jurist. Vad kan jag hjälpa dig med?",
      "ai"
    );
  }

  scrollToBottom(): void {
    setTimeout(() => {
      this.messagesEndRef?.nativeElement?.scrollIntoView({
        behavior: "smooth",
      });
    }, 100);
  }

  async sendMessage(): Promise<void> {
    if (!this.input.trim() || this.loading) return;

    const userMessage: any = {
      id: Date.now(),
      text: this.input,
      sender: "user",
    };
    this.messages.push(userMessage);
    this.scrollToBottom();

    const aiMessageId = Date.now() + 1;
    this.messages.push({ id: aiMessageId, text: "", sender: "ai" });

    const userText = this.input;
    this.input = "";
    this.loading = true;
    this.error = null;

    try {
      // 👇 Prepare full conversation context
      const context = this.messages
        .filter((msg) => msg.sender && msg.text)
        .map((msg) => ({
          role: msg.sender === "user" ? "user" : "model",
          content: msg.text,
        }));

      const response = await fetch(
        environment.serviceURL + "chat/getAISupport",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: userText,
            context: context.slice(-10), // send only last 10 to limit size
          }),
        }
      );

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (!reader) throw new Error("No stream");

      let done = false;
      let currentText = "";

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        const chunk = decoder.decode(value);

        currentText += chunk;

        this.zone.run(() => {
          const index = this.messages.findIndex((m) => m.id === aiMessageId);
          if (index !== -1) this.messages[index].text = currentText;
        });

        this.scrollToBottom();
      }
    } catch (err) {
      this.zone.run(() => {
        this.error = "Something went wrong.";
        const index = this.messages.findIndex((m) => m.id === aiMessageId);
        if (index !== -1)
          this.messages[index] = {
            id: aiMessageId,
            text: this.error,
            sender: "ai",
            isError: true,
          };
      });
    } finally {
      this.zone.run(() => {
        this.loading = false;
      });
    }
  }

  addMessage(text: string, sender: "user" | "ai") {
    this.messages.push({ id: Date.now(), text, sender });
  }

  onKeyDown(e: KeyboardEvent): void {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      this.sendMessage();
    }
  }

  parseMarkdown(text: string): string {
    return marked(text || "");
    // return text;
  }
}

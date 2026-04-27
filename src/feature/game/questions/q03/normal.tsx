import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldTitle,
} from "@/components/ui/field"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function RadioGroupChoiceCard() {
  return (
    <main>
    <div className="text-center pb-4">
      <h4>性別を選択してください。</h4>
    </div>
      
    <div className="flex justify-center">
    <RadioGroup className="max-w-sm">

      <FieldLabel>     
        <Field orientation="horizontal">
          <RadioGroupItem value="male" className="border-slate-400" />
          <FieldContent>
            <FieldTitle>男性</FieldTitle>
          </FieldContent>
        </Field>
      </FieldLabel>

      <FieldLabel>
        <Field orientation="horizontal">
          <RadioGroupItem value="female" className="border-slate-400" />
          <FieldContent>
            <FieldTitle>女性</FieldTitle>
          </FieldContent>
        </Field>
      </FieldLabel>

      <FieldLabel htmlFor="plus-plan">
        <Field orientation="horizontal">
          <RadioGroupItem value="secret" className="border-slate-400" />
          <FieldContent>
            <FieldTitle>回答しない</FieldTitle>
          </FieldContent>
        </Field>
      </FieldLabel>
    </RadioGroup>
    </div>
    </main>
  )
}

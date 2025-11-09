"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

interface CalculatorProps {
  onClose?: () => void
}

export function Calculator({ onClose }: CalculatorProps) {
  const [display, setDisplay] = useState("0")
  const [previousValue, setPreviousValue] = useState<number | null>(null)
  const [operation, setOperation] = useState<string | null>(null)
  const [shouldResetDisplay, setShouldResetDisplay] = useState(false)

  const handleNumber = (num: string) => {
    if (shouldResetDisplay) {
      setDisplay(num)
      setShouldResetDisplay(false)
    } else {
      setDisplay(display === "0" ? num : display + num)
    }
  }

  const handleOperation = (op: string) => {
    const currentValue = Number.parseFloat(display)

    if (previousValue === null) {
      setPreviousValue(currentValue)
    } else if (operation) {
      const result = calculate(previousValue, currentValue, operation)
      setDisplay(String(result))
      setPreviousValue(result)
    }

    setOperation(op)
    setShouldResetDisplay(true)
  }

  const calculate = (a: number, b: number, op: string): number => {
    switch (op) {
      case "+":
        return a + b
      case "-":
        return a - b
      case "×":
        return a * b
      case "÷":
        return a / b
      default:
        return b
    }
  }

  const handleEquals = () => {
    if (operation && previousValue !== null) {
      const currentValue = Number.parseFloat(display)
      const result = calculate(previousValue, currentValue, operation)
      setDisplay(String(result))
      setPreviousValue(null)
      setOperation(null)
      setShouldResetDisplay(true)
    }
  }

  const handleClear = () => {
    setDisplay("0")
    setPreviousValue(null)
    setOperation(null)
    setShouldResetDisplay(false)
  }

  const handleDecimal = () => {
    if (!display.includes(".")) {
      setDisplay(display + ".")
    }
  }

  const handleBackspace = () => {
    if (display.length > 1) {
      setDisplay(display.slice(0, -1))
    } else {
      setDisplay("0")
    }
  }

  const buttons = [
    ["7", "8", "9", "÷"],
    ["4", "5", "6", "×"],
    ["1", "2", "3", "-"],
    ["0", ".", "=", "+"],
  ]

  return (
    <div className="w-full max-w-xs mx-auto bg-card p-6 rounded-2xl shadow-xl border border-border">
      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition"
        >
          <X size={20} />
        </button>
      )}

      <div className="mb-4 bg-muted rounded-xl p-4 min-h-[60px] flex items-center justify-end">
        <div className="text-right">
          {operation && previousValue !== null && (
            <div className="text-xs text-muted-foreground mb-1">
              {previousValue} {operation}
            </div>
          )}
          <div className="text-3xl font-bold text-foreground break-all">{display}</div>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-2 mb-2">
        <Button
          onClick={handleClear}
          variant="outline"
          className="col-span-2 bg-destructive/10 hover:bg-destructive/20 text-destructive border-destructive/30"
        >
          Clear
        </Button>
        <Button onClick={handleBackspace} variant="outline" className="col-span-2 bg-muted hover:bg-accent">
          ⌫
        </Button>
      </div>

      <div className="grid grid-cols-4 gap-2">
        {buttons.map((row, i) =>
          row.map((btn) => {
            const isOperation = ["÷", "×", "-", "+", "="].includes(btn)
            const isEquals = btn === "="
            const isZero = btn === "0"

            return (
              <Button
                key={btn}
                onClick={() => {
                  if (btn === "=") handleEquals()
                  else if (isOperation) handleOperation(btn)
                  else if (btn === ".") handleDecimal()
                  else handleNumber(btn)
                }}
                variant={isOperation ? "default" : "outline"}
                className={`h-14 text-lg font-semibold ${isZero ? "col-span-2" : ""} ${
                  isEquals ? "bg-primary hover:bg-primary/90" : ""
                } ${isOperation && !isEquals ? "bg-secondary hover:bg-secondary/80" : ""}`}
              >
                {btn}
              </Button>
            )
          }),
        )}
      </div>
    </div>
  )
}

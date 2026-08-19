import React from 'react'
import { useSiteConfig } from '../hooks/useSiteConfig'

export default function Process() {
  const { config } = useSiteConfig()

  const steps = config?.processSteps || []

  return (
    <section className="container mt-12">
      <h2 className="text-2xl font-semibold mb-4">
        {config?.processTitle || 'Quy trình thực hiện'}
      </h2>

      <ol className="grid md:grid-cols-2 gap-4">
        {steps.map((s, i) => (
          <li
            key={i}
            className="card p-4 flex gap-3"
          >
            <span className="badge">
              {i + 1}
            </span>

            {s}
          </li>
        ))}
      </ol>
    </section>
  )
}
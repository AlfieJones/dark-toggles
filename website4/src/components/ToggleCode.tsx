import { codeToHtml } from 'shiki'
import { useEffect, useRef, useState } from 'preact/hooks'
import { getCSS, getHTML } from '../generators'

export type Framework = 'html' | 'react'

export function ToggleCode({ framework, toggleName }: { framework: Framework, toggleName: string }) {
    const [html, setHTML] = useState<string>("")
    const [css, setCSS] = useState<string>("")
    const [component, setComponent] = useState<"button" | "div" | "checkbox">("button")

    const mountedRef = useRef(false)


    useEffect(() => {

        mountedRef.current = true

        console.log("HI")

        const getCode = async () => {

            const [rawCode, rawCSS] = await Promise.all([
                getHTML(toggleName, component, framework),
                getCSS(toggleName, component)
            ])



            const [highlightedHTML, highlightedCSS] = await Promise.all([
                codeToHtml(rawCode, {
                    lang: 'html',
                    theme: 'dark-plus'
                }),
                codeToHtml(rawCSS, {
                    lang: 'css',
                    theme: 'dark-plus'
                })
            ])

            if (mountedRef.current) {
                setHTML(highlightedHTML)
                setCSS(highlightedCSS)
            }
        }

        getCode()

        return () => {
            mountedRef.current = false
        }
    }, [framework])

    return (
        <div>
            <div dangerouslySetInnerHTML={{ __html: html }} />
        </div>
    )
}
import fs from 'fs'
import path from 'path'

export type TokenValue = string | number | { $value: TokenValue; $type?: string }

export interface TokenTree {
  [key: string]: TokenTree | TokenValue
}

/**
 * Проверяет, является ли объект токеном с $value
 */
function isToken(obj: any): obj is { $value: TokenValue; $type?: string } {
  return obj && typeof obj === 'object' && '$value' in obj
}

/**
 * Рекурсивно разрешает $value-алиасы типа Colors.Green.1000 или px.5
 */
function resolveAlias(value: any, tree: TokenTree, pathStack: string[] = []): any {
  if (typeof value === 'string' && /^[A-Za-z0-9_.-]+$/.test(value)) {
    const parts = value.split('.')
    let current: any = tree
    for (const part of parts) {
      if (current && typeof current === 'object' && part in current) {
        current = current[part]
        if (isToken(current)) current = current.$value
      } else {
        console.warn(`\u274C Alias not found: ${value} in "${pathStack.join('.')}"`)
        return value
      }
    }
    return current
  }
  return value
}

/**
 * Рекурсивно разрешает все $value в дереве
 */
function buildResolvedTree(obj: TokenTree, fullTree: TokenTree, pathStack: string[] = []): TokenTree {
  const result: TokenTree = {}
  for (const [key, val] of Object.entries(obj)) {
    if (isToken(val)) {
      result[key] = resolveAlias(val.$value, fullTree, [...pathStack, key])
    } else if (typeof val === 'object' && val !== null) {
      result[key] = buildResolvedTree(val, fullTree, [...pathStack, key])
    } else {
      result[key] = val
    }
  }
  return result
}

/**
 * Загружает токены из JSON-файла и возвращает распарсенные значения с разрешёнными алиасами
 */
export function parseTokensAll(jsonPath: string): TokenTree {
  const raw = fs.readFileSync(jsonPath, 'utf-8')
  const json = JSON.parse(raw)
  return buildResolvedTree(json, json)
}

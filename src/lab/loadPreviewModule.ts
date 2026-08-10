/**
 * Runtime-only Preview loaders for Validation diagnostics.
 * Lottie is loaded via opaque dynamic import so tsc does not follow
 * PWA-Base preview-lottie source (peer type resolution across worktrees).
 */
export async function loadPreviewModule(
  packageId: string,
): Promise<Record<string, unknown>> {
  switch (packageId) {
    case '@songara/pwa-base/preview/motion':
      return (await import('@songara/pwa-base/preview/motion')) as Record<
        string,
        unknown
      >
    case '@songara/pwa-base/preview/dexie':
      return (await import('@songara/pwa-base/preview/dexie')) as Record<
        string,
        unknown
      >
    case '@songara/pwa-base/preview/lottie': {
      const id: string = '@songara/pwa-base/preview/lottie'
      return (await import(/* @vite-ignore */ id)) as Record<string, unknown>
    }
    default: {
      const id = packageId
      return (await import(/* @vite-ignore */ id)) as Record<string, unknown>
    }
  }
}

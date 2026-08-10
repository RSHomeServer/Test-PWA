/**
 * Runtime Preview loaders for Validation diagnostics.
 * Use analyzable static subpath imports so Vite resolves package exports
 * (opaque `@vite-ignore` dynamic imports often fail for Preview peers).
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
    case '@songara/pwa-base/preview/lottie':
      return (await import('@songara/pwa-base/preview/lottie')) as Record<
        string,
        unknown
      >
    case '@songara/pwa-base/preview/rive':
      return (await import('@songara/pwa-base/preview/rive')) as Record<
        string,
        unknown
      >
    case '@songara/pwa-base/preview/gsap':
      return (await import('@songara/pwa-base/preview/gsap')) as Record<
        string,
        unknown
      >
    case '@songara/pwa-base/preview/tsparticles':
      return (await import('@songara/pwa-base/preview/tsparticles')) as Record<
        string,
        unknown
      >
    case '@songara/pwa-base/preview/rapier2d':
      return (await import('@songara/pwa-base/preview/rapier2d')) as Record<
        string,
        unknown
      >
    case '@songara/pwa-base/preview/matter':
      return (await import('@songara/pwa-base/preview/matter')) as Record<
        string,
        unknown
      >
    case '@songara/pwa-base/preview/planck':
      return (await import('@songara/pwa-base/preview/planck')) as Record<
        string,
        unknown
      >
    case '@songara/pwa-base/preview/cannon':
      return (await import('@songara/pwa-base/preview/cannon')) as Record<
        string,
        unknown
      >
    case '@songara/pwa-base/preview/react-webcam':
      return (await import('@songara/pwa-base/preview/react-webcam')) as Record<
        string,
        unknown
      >
    case '@songara/pwa-base/preview/tone':
      return (await import('@songara/pwa-base/preview/tone')) as Record<
        string,
        unknown
      >
    case '@songara/pwa-base/preview/howler':
      return (await import('@songara/pwa-base/preview/howler')) as Record<
        string,
        unknown
      >
    case '@songara/pwa-base/preview/idb':
      return (await import('@songara/pwa-base/preview/idb')) as Record<
        string,
        unknown
      >
    case '@songara/pwa-base/preview/localforage':
      return (await import('@songara/pwa-base/preview/localforage')) as Record<
        string,
        unknown
      >
    default:
      throw new Error(`Unknown Preview package: ${packageId}`)
  }
}

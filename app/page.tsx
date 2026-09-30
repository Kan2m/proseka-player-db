import PlayerDirectory from "./PlayerDirectory";
import { getAvatarUrls } from "./lib/profiles";

// アイコン更新時は revalidatePath で即時反映。念のため定期的にも再生成する
export const revalidate = 600;

export default async function Home() {
  const avatarUrls = await getAvatarUrls();

  return <PlayerDirectory avatarUrls={avatarUrls} />;
}

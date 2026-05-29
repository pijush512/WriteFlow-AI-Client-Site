{/* এখানে আমরা টাইপস্ক্রিপ্টকে পুরোপুরি অবহেলা করার নির্দেশ দিচ্ছি */}
  {/* @ts-ignore */}
  <AvatarImage src={user?.avatar} alt={user?.name || "User"} />
  {/* @ts-ignore */}
  <AvatarFallback>{user?.name?.[0] || "U"}</AvatarFallback>
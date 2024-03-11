import { auth } from "@clerk/nextjs";
import prismadb from "@/lib/prismadb";
import { MAX_FREE_COUNTS, GPT3_FREE_COUNTS } from "@/constants";

export const incrementApiLimit = async () => {
  const { userId } = auth();

  if (!userId) {
    return;
  }

  const userApiLimit = await prismadb.userApiLimit.findUnique({
    where: {
      userId
    },
  });

  if (userApiLimit) {
    await prismadb.userApiLimit.update({
      where: { userId: userId },
      data: { count: userApiLimit.count + 1 },
    });
  } else {
    await prismadb.userApiLimit.create({
      data: { userId: userId, count: 1, gpt3Count: 0 },
    });
  }
};

export const incrementGpt3ApiLimit = async () => {
  const { userId } = auth();

  if (!userId) {
    return;
  }

  const userApiLimit = await prismadb.userApiLimit.findUnique({
    where: {
      userId
    },
  });

  if (userApiLimit) {
    await prismadb.userApiLimit.update({
      where: { userId: userId },
      data: { gpt3Count: userApiLimit.gpt3Count + 1 },
    });
  } else {
    await prismadb.userApiLimit.create({
      data: { userId: userId, count: 0, gpt3Count: 1 },
    });
  }
}

export const checkApiLimit = async () => {
  const { userId } = auth();

  if (!userId) {
    return false;
  }

  const userApiLimit = await prismadb.userApiLimit.findUnique({
    where: {
      userId: userId
    },
  });

  if (!userApiLimit || userApiLimit.count < MAX_FREE_COUNTS) {
    return true;
  } else {
    return false;
  }
};

export const checkGpt3ApiLimit = async () => {
  const { userId } = auth();

  if (!userId) {
    return false;
  }

  const userApiLimit = await prismadb.userApiLimit.findUnique({
    where: {
      userId: userId
    },
  });

  if (!userApiLimit || userApiLimit.gpt3Count < GPT3_FREE_COUNTS) {
    return true;
  } else {
    return false;
  }
};

export const getApiLimitCount = async () => {
  const { userId } = auth();

  if (!userId) {
    return 0;
  }

  const userApiLimit = await prismadb.userApiLimit.findUnique({
    where: {
      userId
    }
  });

  if (!userApiLimit) {
    return 0;
  }

  return userApiLimit.count;
};

export const getGpt3ApiLimitCount = async () => {
  const { userId } = auth();

  if (!userId) {
    return 0;
  }

  const userApiLimit = await prismadb.userApiLimit.findUnique({
    where: {
      userId
    }
  });

  if (!userApiLimit) {
    return 0;
  }

  return userApiLimit.gpt3Count;
};

export const resetApiLimit = async () => {
  await prismadb.userApiLimit.updateMany({
    data: { count: 0, gpt3Count: 0 },
  });
};

